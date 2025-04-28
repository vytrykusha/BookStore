import React, { createContext, useState, useEffect } from "react";

export const BookContext = createContext();

export const BookProvider = ({ children }) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    localStorage.removeItem("books");
    const storedBooks = localStorage.getItem("books");
    if (storedBooks) {
      setBooks(JSON.parse(storedBooks));
    } else {
      const fetchedBooks = [
        {
          id: 1,
          title: "The Great Gatsby",
          price: 12.99,
          category: "Classic",
          description: "A novel by F. Scott Fitzgerald set in the Jazz Age.",
          image: "https://images-na.ssl-images-amazon.com/images/I/81af+MCATTL.jpg",
          discount: 0,
        },
        {
          id: 2,
          title: "Sapiens: A Brief History of Humankind",
          price: 18.99,
          category: "History",
          description: "A book by Yuval Noah Harari exploring human evolution.",
          image: "https://images-na.ssl-images-amazon.com/images/I/713jIoMO3UL.jpg",
          discount: 0,
        },
        {
          id: 3,
          title: "1984",
          price: 14.99,
          category: "Dystopian",
          description: "A novel by George Orwell about a totalitarian regime.",
          image: "https://images-na.ssl-images-amazon.com/images/I/71kxa1-0mfL.jpg",
          discount: 0,
        },
        {
          id: 4,
          title: "The Catcher in the Rye",
          price: 10.99,
          category: "Fiction",
          description: "A novel by J.D. Salinger about teenage rebellion.",
          image: "https://images-na.ssl-images-amazon.com/images/I/81OthjkJBuL.jpg",
          discount: 0,
        },
        {
          id: 5,
          title: "To Kill a Mockingbird",
          price: 11.99,
          category: "Classic",
          description: "A novel by Harper Lee about racial injustice.",
          image: "https://images-na.ssl-images-amazon.com/images/I/81gepf1eMqL.jpg",
          discount: 0,
        },
        {
          id: 6,
          title: "The Count of Monte Cristo",
          price: 14.49,
          category: "Adventure",
          description: "A novel by Alexandre Dumas about revenge and justice.",
          image: "https://sterling-us.imgix.net/covers/9781454959915.jpg?auto=format&h=648",
          discount: 0
        },
        {
          id: 7,
          title: "Pride and Prejudice",
          price: 10.49,
          category: "Classic",
          description: "A novel by Jane Austen about love and societal expectations.",
          image: "https://images-na.ssl-images-amazon.com/images/I/81gTwYAhU7L.jpg",
          discount: 0
        },
        {
          id: 8,
          title: "The Alchemist",
          price: 11.99,
          category: "Philosophical",
          description: "A novel by Paulo Coelho about following one's dreams.",
          image: "https://images-na.ssl-images-amazon.com/images/I/71aFt4+OTOL.jpg",
          discount: 0
        },
        {
          id: 9,
          title: "Moby-Dick",
          price: 12.99,
          category: "Classic",
          description: "A novel by Herman Melville about obsession and revenge.",
          image: "https://static.yakaboo.ua/media/catalog/product/8/1/81wuzjpmxjl.jpg",
          discount: 0
        },
        {
          id: 10,
          title: "War and Peace",
          price: 14.99,
          category: "Historical",
          description: "A novel by Leo Tolstoy about war, society, and personal struggles.",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQELpZt8HFnAdM2Rz0vdg_NU8aEcrRulhIEMQ&s",
          discount: 0
        },
        {
          id: 11,
          title: "The Picture of Dorian Gray",
          price: 9.99,
          category: "Classic",
          description: "A novel by Oscar Wilde about vanity and consequences.",
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjP-24dFyFH-AMvu2BlA-EpSTwEXusFMNBDA&s",
          discount: 0
        },
        {
          id: 12,
          title: "The Hobbit",
          price: 12.49,
          category: "Fantasy",
          description: "A novel by J.R.R. Tolkien about Bilbo Baggins' adventure.",
          image: "https://images-na.ssl-images-amazon.com/images/I/81t2CVWEsUL.jpg",
          discount: 0
        },
        {
          id: 13,
          title: "Jane Eyre",
          price: 10.99,
          category: "Classic",
          description: "A novel by Charlotte Brontë about self-respect and love.",
          image: "https://static.yakaboo.ua/media/catalog/product/i/m/img_78871.jpg",
          discount: 0
        },
        {
          id: 14,
          title: "Frankenstein",
          price: 9.49,
          category: "Horror",
          description: "A novel by Mary Shelley about scientific ambition and ethics.",
          image: "https://content2.rozetka.com.ua/goods/images/big/378611348.png",
          discount: 0
        },
        {
          id: 15,
          title: "Don Quixote",
          price: 14.99,
          category: "Classic",
          description: "A novel by Miguel de Cervantes about chivalry and reality.",
          image: "https://nashformat.ua/files/products/don-quixote-901064.800x800.jpeg",
          discount: 0
        },
        {
          id: 16,
          title: "Lord of the Flies",
          price: 10.99,
          category: "Classic",
          description: "A novel by William Golding about survival and human nature.",
          image: "https://static.yakaboo.ua/media/cloudflare/product/webp/600x840/8/1/81uc0ffe6xl.jpg",
          discount: 0
        },
        {
          id: 17,
          title: "The Divine Comedy",
          price: 15.99,
          category: "Philosophical",
          description: "A poem by Dante Alighieri about the journey through the afterlife.",
          image: "https://m.media-amazon.com/images/I/51i-9SGWr-L._AC_UF1000,1000_QL80_.jpg",
          discount: 0
        },
        {
          id: 18,
          title: "Alice's Adventures in Wonderland",
          price: 8.99,
          category: "Fantasy",
          description: "A novel by Lewis Carroll about a whimsical journey.",
          image: "https://m.media-amazon.com/images/I/71Uj9TYDQXL._UF1000,1000_QL80_.jpg",
          discount: 0
        },   
      ];
      setBooks(fetchedBooks);
      localStorage.setItem("books", JSON.stringify(fetchedBooks));
    }
  }, []);

  return (
    <BookContext.Provider value={{ books, setBooks }}>
      {children}
    </BookContext.Provider>
  );
};