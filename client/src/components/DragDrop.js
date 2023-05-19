import { useState } from 'react';
import Picture from './Picture';
import "../App.css";
import { useDrop } from "react-dnd";
import "./DragDrop.scss";
import SearchBar from './SearchBar/SearchBar';
import axios from 'axios';

function DragDrop() {
  const [board, setBoard] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'image',
    drop: (item) => addImageToBoard(item.id),
    collect: (monitor) => ({
      isOver: monitor.isOver,
    }),
  }));

  const addImageToBoard = (id) => {
    const picture = searchResults.find((picture) => picture.id === id);
    if (picture) {
      setBoard((prevBoard) => [
        ...prevBoard,
        { ...picture, type: 'image', isHovered: false },
      ]);
    }
  };

  const handleImageHover = (id, isHovered) => {
    setBoard((prevBoard) =>
      prevBoard.map((picture) =>
        picture.id === id ? { ...picture, isHovered } : picture
      )
    );
  };

  async function handleSearch(query) {
    const options = {
      method: 'GET',
      url: 'https://sephora.p.rapidapi.com/products/search',
      params: {
        q: query,
        pageSize: '60',
        currentPage: '1',
      },
      headers: {
        'X-RapidAPI-Key': '80d6770e8amshd5d7944c03c1aafp176b4djsn5a775533b128',
        'X-RapidAPI-Host': 'sephora.p.rapidapi.com',
      },
    };

    try {
      const response = await axios.request(options);
      console.log(response.data.products);
      setSearchResults(
        response.data.products.map((product) => ({
          url: product.heroImage,
          id: product.productId,
          type: 'image',
        }))
      );
      console.log(searchResults);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className="header">
        <div className="logo">SkinMatch.</div>
        <SearchBar onSearch={handleSearch} id="searchBar" />
      </div>
      <div className="Pictures" id="pictures">
        {searchResults.map((picture) => (
          <Picture
            key={`search-${picture.id}`}
            url={picture.url}
            id={picture.id}
          />
        ))}
      </div>
      <div
        className={`Board ${isOver ? 'is-over' : ''}`}
        ref={drop}
        id="board"
      >
        {board.map((picture) => (
          <Picture
            key={`board-${picture.id}`}
            url={picture.url}
            id={picture.id}
            isHovered={picture.isHovered}
            onImageHover={handleImageHover}
          />
        ))}
      </div>
    </>
  );
}

export default DragDrop;
