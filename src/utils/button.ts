import { ENDPOINT } from "@/enums/endpoint.enum"; // Giả sử bạn đã khai báo endpoint ở đây
import { apiService } from "@/services/api.service";

interface ItemOrderData {
  amount: number;
  san_pham: number;
  size: string;
  price: string;
  idCart: string;
  noted?: string;
}

interface OrderData {
  user: string;
  ID_order: string;
  date_order: string;
  status: string;
  items: ItemOrderData[];
  voucher?: number;
  finalAmount: number;
  price_not_reduced: number;
}

export const addToCart = async (
  productId: number,
  amount: number,
  userId: string,
  size: string,
  price: number,
  noted?: string
) => {
  try {
    // Gửi yêu cầu thêm sản phẩm vào giỏ hàng
    const response = await apiService.post(
      `${ENDPOINT.ADD_TO_CART}/${userId}/cart/products`, // Giả sử đây là endpoint thêm vào giỏ hàng
      { productId, amount, size, price, noted }
    );

    // Nếu thành công, trả về thông báo hoặc dữ liệu cần thiết
    console.log("Sản phẩm đã được thêm vào giỏ hàng:", response);
    return response; // Có thể trả về dữ liệu giỏ hàng đã cập nhật hoặc thông báo
  } catch (error) {
    // Xử lý lỗi khi thêm sản phẩm vào giỏ hàng
    console.error("Lỗi khi thêm sản phẩm vào giỏ hàng:", error);
    throw error; // Có thể ném lại lỗi hoặc trả về thông báo lỗi tùy thuộc vào yêu cầu
  }
};
export const updateCartItemQuantity = async (
  userId: string,
  idCart: number,
  action: "increase" | "decrease"
) => {
  try {
    // Gửi yêu cầu cập nhật số lượng sản phẩm trong giỏ hàng
    const response = await apiService.post(
      `${ENDPOINT.UPDATE_CART_ITEM}/${userId}/cart/products/${idCart}/${action}`, // Endpoint cập nhật số lượng
      {}
    );

    // Nếu thành công, trả về thông báo hoặc dữ liệu giỏ hàng đã cập nhật
    console.log(
      `Số lượng sản phẩm đã được ${action === "increase" ? "tăng" : "giảm"}.`
    );
    return response; // Có thể trả về dữ liệu giỏ hàng đã cập nhật hoặc thông báo
  } catch (error) {
    // Xử lý lỗi khi cập nhật số lượng sản phẩm trong giỏ hàng
    console.error(
      `Lỗi khi ${action === "increase" ? "tăng" : "giảm"} số lượng sản phẩm:`,
      error
    );
    throw error; // Ném lỗi hoặc trả về thông báo lỗi
  }
};
export const removeFromCart = async (userId: string, idCart: number) => {
  try {
    const token = process.env.NEXT_PUBLIC_TOKEN_DEV; // Lấy token từ môi trường

    // Gửi yêu cầu xóa sản phẩm khỏi giỏ hàng bằng fetch
    const response = await fetch(
      `${ENDPOINT.DELETE_CART_ITEM}/${userId}/cart/products/${idCart}`, // Endpoint xóa sản phẩm khỏi giỏ hàng
      {
        method: "DELETE", // Xóa sản phẩm
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Truyền token Bearer vào header
        },
      }
    );

    // Kiểm tra nếu phản hồi OK
    if (!response.ok) {
      throw new Error("Không thể xóa sản phẩm khỏi giỏ hàng.");
    }

    const data = await response.json(); // Lấy dữ liệu phản hồi

    // Nếu thành công, trả về thông báo hoặc dữ liệu giỏ hàng đã cập nhật
    console.log("Sản phẩm đã được xóa khỏi giỏ hàng:", data);
    return data; // Trả về giỏ hàng mới hoặc thông báo thành công
  } catch (error) {
    // Xử lý lỗi khi xóa sản phẩm khỏi giỏ hàng
    console.error("Lỗi khi xóa sản phẩm khỏi giỏ hàng:", error);
    throw error; // Ném lỗi hoặc trả về thông báo lỗi
  }
};

export const createOrderService = async (data: OrderData) => {
  try {
    // Gửi yêu cầu tạo đơn hàng nháp
    const response = await apiService.post(
      `${ENDPOINT.CREATE_ORDER}`, // Endpoint tạo đơn hàng
      { data: data } // Truyền toàn bộ đối tượng data (OrderData)
    );

    // Nếu yêu cầu thành công, trả về thông tin đơn hàng nháp
    console.log("Đơn hàng nháp đã được tạo:", response);
    return response; // Trả về dữ liệu đơn hàng hoặc thông báo thành công
  } catch (error) {
    // Xử lý lỗi khi tạo đơn hàng
    console.error("Lỗi khi tạo đơn hàng:", error);
    throw error; // Ném lỗi hoặc trả về thông báo lỗi
  }
};

export const generateOrderId = () => {
  const part1 = Math.floor(Math.random() * (999 - 100 + 1)) + 100; // 3 số ngẫu nhiên
  const part2 = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000; // 4 số ngẫu nhiên
  return `${part1}_${part2}`;
};
