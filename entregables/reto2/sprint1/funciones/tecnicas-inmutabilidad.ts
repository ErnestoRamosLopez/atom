//src/components/shopping-cart.component.tsx
//updating state with immutability
const clearItem = (item: any) => {
    setRemovingRows(prev => [...prev, item.id]);

    setTimeout(() => {
        dispatch(clearItemFromCart(shoppingItems, item, canSaveCart));
        setRemovingRows(prev => prev.filter(it => it !== item.id));
    }, 500);
}