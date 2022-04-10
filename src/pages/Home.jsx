import React from "react";
import {Categories, Sort, PizzaBlock, PizzaBlockLoading} from "../components";
import {useSelector, useDispatch} from "react-redux";
import {setCategory, setSortBy} from "../redux/actions/filters"
import {fetchPizzas} from "../redux/actions/pizzas";
import {addPizzaCart} from "../redux/actions/cart";

const categoryNames = ["Мясные", "Вегетарианская", "Гриль", "Острые", "Закрытые"]
const sortItems = [
    {name: "популярности", type: "rating"},
    {name: "цене", type: "price"},
    {name: "алфавиту", type: "name"}
]

function Home() {
    const dispatch = useDispatch()
    const items = useSelector(({pizzas}) => pizzas.items)
    const cartItems = useSelector(({cart}) => cart.items)
    const isLoaded = useSelector(({pizzas}) => pizzas.isLoaded)
    const {category, sortBy} = useSelector(({filters}) => filters)

    React.useEffect(() => {
        dispatch(fetchPizzas(category, sortBy))
    }, [category, sortBy])

    const onSelectCategory = React.useCallback((index) => {
        dispatch(setCategory(index))
    }, [dispatch])

    const onClickSortBy = React.useCallback((type) => {
        dispatch(setSortBy(type))
    }, [dispatch])

    const addPizzaToCart = (obj) => {
        dispatch(addPizzaCart(obj))
    }

    return (
        <div className="container">
            <div className="content__top">
                <Categories activeCategory={category} onClickItem={onSelectCategory} items={categoryNames}/>
                <Sort activeSortBy={sortBy} items={sortItems} onClickSortBy={onClickSortBy}/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoaded
                    ? items.map((obj) =>
                        <PizzaBlock
                            key={obj.id}
                            isLoading={true} {...obj}
                            cartCount={cartItems[obj.id] && cartItems[obj.id].items.length}
                            onClickAddPizza={addPizzaToCart}
                        />)
                    : Array(4)
                        .fill(0)
                        .map((_, index) => <PizzaBlockLoading key={index}/>)
                }
            </div>
        </div>
    )
}

export default Home