"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

let currentBookId = 1000;

const BookDashboard = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [imageLink, setImageLink] = useState("");

  const formik = useFormik({
    initialValues: {
      title: "",
      author: "",
      genre: "",
      description: "",
      publishedYear: "",
      stock: 0,
      discount: 0,
      price: "",
      pages: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().max(100).required("Title is required"),
      author: Yup.string().max(50).required("Author is required"),
      genre: Yup.string().required("Genre is required"),
      description: Yup.string().max(1000).required("Description is required"),
      publishedYear: Yup.number()
        .min(1800)
        .max(new Date().getFullYear())
        .required("Published year is required"),
      stock: Yup.number().min(0).required("Stock is required"),
      discount: Yup.number().min(0).max(100),
      price: Yup.number().min(0).required("Price is required"),
      pages: Yup.number().min(1).required("Pages are required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      const bookData = {
        bookId: currentBookId++,
        ...values,
        imageLink,
      };

      try {
        await axios.post("/api/books", bookData);
        alert("Book submitted successfully!");
        resetForm();
        setImagePreview(null);
        setImageLink("");
      } catch (error) {
        console.error(error);
        alert("Failed to submit book.");
      }
    },
  });

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    uploadImage(file);
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    uploadImage(file);
  };

  const uploadImage = async (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;
      setImagePreview(base64);
      // Simulate upload and generate link
      const fakeLink = `/uploads/${file.name}`;
      setImageLink(fakeLink);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-xl">
      <h1 className="text-2xl font-bold mb-4">Add New Book</h1>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        {[
          ["title", "Title"],
          ["author", "Author"],
          ["genre", "Genre"],
          ["description", "Description"],
          ["publishedYear", "Published Year"],
          ["stock", "Stock"],
          ["discount", "Discount (%)"],
          ["price", "Price ($)"],
          ["pages", "Pages"],
        ].map(([field, label]) => (
          <div key={field}>
            <label className="block font-medium">{label}</label>
            <input
              type={field === "description" ? "textarea" : "text"}
              name={field}
              value={formik.values[field]}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {formik.touched[field] && formik.errors[field] && (
              <div className="text-red-500 text-sm">{formik.errors[field]}</div>
            )}
          </div>
        ))}

        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="w-full h-32 border-2 border-dashed border-gray-400 rounded flex items-center justify-center text-gray-500 cursor-pointer"
        >
          Drag & Drop Image Here
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageSelect}
          className="block mt-2"
        />
        {imagePreview && (
          <img src={imagePreview} alt="Preview" className="mt-2 w-40" />
        )}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default BookDashboard;
