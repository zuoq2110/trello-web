import { Box } from '@mui/material'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/pages/utils/sorts'
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  MouseSensor,
  TouchSensor,
  DragOverlay,
  defaultDropAnimationSideEffects,
  closestCorners
} from '@dnd-kit/core'
import {
  arrayMove
} from '@dnd-kit/sortable';
import { useEffect, useState } from 'react'
import Column from './ListColumns/Column/Column';
import Card from './ListColumns/Column/ListCards/Card/Card'
import { clone, cloneDeep } from 'lodash';

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}
const BoardContent = ({ board }) => {
  const pointerSensor = useSensor(PointerSensor, { activationConstraint: { distance: 10 } })

  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } })
  //Nhấn giữ 250ms và dung sai cảm ứng 5px thì kích hoạt event
  const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 500 } })


  const sensors = useSensors(mouseSensor, touchSensor)

  const [orderedColumns, setOrderedColumns] = useState([])

  //Cùng 1 thời điểm chỉ có 1 phần tử đang đc kéo(col or card)
  const [activeDragItemId, setActiveDragItemId] = useState(null)
  const [activeDragItemType, setActiveDragItemType] = useState(null)
  const [activeDragItemData, setActiveDragItemData] = useState(null)
  const [originalColumn, setOriginalColumn] = useState(null)


  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  const moveCardBetweenDiffirentColumns = (
    overColumn,
    overCardId,
    active,
    over,
    activeColumn,
    activeDraggingCardId,
    activeDraggingCardData
  ) => {
    setOrderedColumns(prevColumn => {
      //Tìm vị trí của overCard trong column đích (nơi mà activeCard sắp đc thả)
      const overCardIndex = overColumn?.cards?.findIndex(card => card._id === overCardId)

      let newCardIndex
      const isBelowOverItem = active.rect.current.translated &&
        active.rect.current.translated.top > over.rect.top + over.rect.height
      const modifier = isBelowOverItem ? 1 : 0
      newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards.length + 1

      const nextColumns = cloneDeep(prevColumn)
      const nextActiveColumn = nextColumns.find(column => column._id === activeColumn._id)
      const nextOverColumn = nextColumns.find(column => column._id === overColumn._id)

      if (nextActiveColumn) {
        nextActiveColumn.cards = nextActiveColumn.cards.filter(card => card._id !== activeDraggingCardId)

        nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(card => card._id)
      }

      if (nextOverColumn) {
        nextOverColumn.cards = nextOverColumn.cards.filter(card => card._id !== activeDraggingCardId)

        const rebuild_activeDraggingCardData = {
          ...activeDraggingCardData,
          columnId: nextOverColumn._id
        }
        nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, rebuild_activeDraggingCardData)

        nextOverColumn.cardOrderIds = nextOverColumn.cards.map(card => card._id)
      }
      return nextColumns
    })
  }
  const findColumnByCardId = (cardId) => {
    return orderedColumns.find(column => column.cards.map(card => card._id)?.includes(cardId))
  }

  const handleDragStart = (event) => {
    console.log('handleDragStart ', event)
    setActiveDragItemId(event?.active?.id)
    setActiveDragItemType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
    setActiveDragItemData(event?.active?.data?.current)
    if (event?.active?.data?.current?.columnId) {
      setOriginalColumn(findColumnByCardId(event?.active?.id))
    }
  }

  const handleDragOver = (event) => {
    //Column
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return

    // console.log('handleDragOver:', event)
    //Card
    const { active, over } = event
    if (!active || !over) return

    const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active
    //overCard: là cái card đang tương tác trên or dưới so vs card đang đc kéo 
    const { id: overCardId } = over

    //Tìm 2 column theo cardId
    const activeColumn = findColumnByCardId(activeDraggingCardId)
    const overColumn = findColumnByCardId(overCardId)


    if (!activeColumn || !overColumn) return

    if (activeColumn._id !== overColumn._id) {
      moveCardBetweenDiffirentColumns(overColumn,
        overCardId,
        active,
        over,
        activeColumn,
        activeDraggingCardId,
        activeDraggingCardData)
    }

  }
  const handleDragEnd = (event) => {
    console.log('handleDragEnd ', event)
    const { active, over } = event
    if (!active || !over) return
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active
      //overCard: là cái card đang tương tác trên or dưới so vs card đang đc kéo 
      const { id: overCardId } = over

      //Tìm 2 column theo cardId
      const activeColumn = findColumnByCardId(activeDraggingCardId)
      const overColumn = findColumnByCardId(overCardId)
      if (!activeColumn || !overColumn) return
      if (originalColumn._id !== overColumn._id) {
        moveCardBetweenDiffirentColumns(overColumn,
          overCardId,
          active,
          over,
          activeColumn,
          activeDraggingCardId,
          activeDraggingCardData)
      }
      else {
        //Hành động kéo thả card trong cùng 1 column
        const oldCardIndex = originalColumn?.cards?.findIndex(c => c._id === activeDragItemId)
        const newCardIndex = overColumn?.cards?.findIndex(c => c._id === overCardId)

        const dndOrderedCards = arrayMove(originalColumn?.cards, oldCardIndex, newCardIndex)
        setOrderedColumns(prevColumns => {
          const nextColumns = cloneDeep(prevColumns)
          const targetColumn = nextColumns.find(c => c._id === overColumn._id)

          targetColumn.cards = dndOrderedCards
          targetColumn.cardOrderIds = dndOrderedCards.map(card => card._id)
          return nextColumns
        })
      }
    }

    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      if (active.id !== over.id) {
        const oldColumnIndex = orderedColumns.findIndex(c => c._id === active.id)
        const newColumnIndex = orderedColumns.findIndex(c => c._id === over.id)
        const dndOrderedColumns = arrayMove(orderedColumns, oldColumnIndex, newColumnIndex)
        console.log('dndOrderedColumns ', dndOrderedColumns);
        setOrderedColumns(dndOrderedColumns)
      }
    }

    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setActiveDragItemData(null)
    setOriginalColumn(null)

  }

  const dropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({ styles: { active: { opacity: '0.5' } } })
  }
  return (

    <DndContext onDragStart={handleDragStart}
      collisionDetection={closestCorners}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
      sensors={sensors}>
      <Box sx={{
        backgroundColor: 'primary.main',
        width: '100%',
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
        height: (theme) => theme.trello.boardContentHeight,
        display: 'flex',
        p: '10px 0'
      }}>
        <ListColumns columns={orderedColumns} />
        <DragOverlay dropAnimation={dropAnimation}>
          {(!activeDragItemType) && null}
          {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) && <Column column={activeDragItemData} />}
          {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) && <Card card={activeDragItemData} />}

        </DragOverlay>

      </Box>
    </DndContext>
  )
}

export default BoardContent
