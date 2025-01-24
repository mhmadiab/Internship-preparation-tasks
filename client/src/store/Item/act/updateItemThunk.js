import { createAsyncThunk } from "@reduxjs/toolkit";

const host = process.env.BACKEND_API || "http://localhost:4000"

const updateItem = createAsyncThunk(
  "item/updateItem",
  async (itemData, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${host}/api/item/updateitem/${itemData.itemId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(itemData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData); 
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue({
        message: error.message || "An unexpected error occurred",
      });
    }
  }
);

export default updateItem;