import { useState, React } from 'react'
import Picture from './Picture'
import "../App.css";
import { useDrop } from "react-dnd"
import "./DragDrop.scss"
import SearchBar from './SearchBar/SearchBar.js';


const PictureList = [
    {
        id: 1,
        url: "https://i.ebayimg.com/images/g/0ZIAAOSwbhNkKA~V/s-l1600.png"
    },
    {
        id: 2,
        url: "https://www.sephora.com/productimages/sku/s2628527-main-zoom.jpg"
    },
    {
        id: 3,
        url: "https://www.wantboard.ca/cdn/shop/products/71lkS78H0zL._SX679_grande.jpg?v=1667937252"
    },
]

function DragDrop() {
    const [board, setBoard] = useState([])

    const [{ isOver }, drop] = useDrop(() => ({
        accept: "image",
        drop: (item) => addImageToBoard(item.id),
        collect: (monitor) => ({
            isOver: !!monitor.isOver()
        }),
    }))

    const addImageToBoard = (id) => {
        console.log(id);
        const pictureList = PictureList.filter((picture => id === picture.id))
        setBoard((board) => [...board, pictureList[0]])
    }

    function handleSearch(query) {
        // Handle search query
    }

    return (
        <>
            <div className="header">
                <div className="logo">SkinMatch.</div>
                <SearchBar onSearch={handleSearch} id="searchBar" />
            </div>
            <div className="Pictures" id="pictures">
                {PictureList.map((picture) => {
                    return <Picture url={picture.url} id={picture.id} />
                })}</div>

            <div className="Board" ref={drop} id="board">
                {board.map((picture) => {
                    return <Picture url={picture.url} id={picture.id} />
                })}</div>
        </>
    )
}

export default DragDrop