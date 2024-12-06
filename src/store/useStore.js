import { create } from "zustand";
import axios from "axios";

const useStore = create((set) => ({
  items: [],
  loading: false,
  error: null,

  fetchProducts: async () => {
    set({ loading: true });
    try {
      const response = await axios.post(
        "http://92.223.44.222:5050/store/onlineStoreProductsHot",
        {
          type: "hot",
        }
      );
      set({ items: response.data, error: null });
    } catch (err) {
      set({ error: "Mahsulotlar yuklab olinmadi", items: [] });
      console.error(err);
    } finally {
      set({ loading: false });
    }
  },
}));

export default useStore;
