TECHZONE - WEBSITE QUẢN LÝ CỬA HÀNG MÁY TÍNH
=================================================

1. CÔNG NGHỆ
- HTML5 và CSS3 thuần.
- Không sử dụng JavaScript, framework, backend hoặc cơ sở dữ liệu.
- Các trang sử dụng dữ liệu minh họa và liên kết điều hướng bằng thẻ <a>.
- Các biểu mẫu chỉ minh họa giao diện; không lưu dữ liệu thật.

2. CÁCH MỞ BẰNG VS CODE
1) Giải nén file quan-ly-cua-hang-may-tinh.zip.
2) Mở VS Code.
3) Chọn File > Open Folder... và chọn thư mục quan-ly-cua-hang-may-tinh.
4) Mở file index.html.
5) Có thể cài extension Live Server (không bắt buộc), nhấn chuột phải index.html > Open with Live Server.
   Hoặc mở trực tiếp index.html bằng trình duyệt.
6) Trang quản trị: mở admin/dashboard.html hoặc bấm “Mở khu vực Admin” ở trang đăng nhập.

3. CẤU TRÚC THƯ MỤC
quan-ly-cua-hang-may-tinh/
|-- index.html
|-- products.html
|-- product-detail.html
|-- cart.html
|-- checkout.html
|-- login.html
|-- register.html
|-- about.html
|-- contact.html
|-- policy.html
|-- css/
|   |-- style.css
|-- admin/
    |-- dashboard.html
    |-- products.html
    |-- form-product.html
    |-- categories.html
    |-- orders.html
    |-- form-invoice.html
    |-- customers.html
    |-- employees.html
    |-- suppliers.html
    |-- imports.html
    |-- import-detail.html
    |-- accounts.html
    |-- permissions.html

4. CÁC NHÓM CHỨC NĂNG
Khách hàng:
- Trang chủ, danh sách sản phẩm, chi tiết sản phẩm, giỏ hàng, thanh toán.
- Đăng nhập, đăng ký, giới thiệu, liên hệ, chính sách.

Quản trị:
- Tổng quan doanh thu và đơn hàng minh họa.
- Quản lý sản phẩm và danh mục.
- Quản lý đơn hàng/hóa đơn (có maKH và maNV).
- Quản lý khách hàng, nhân viên, nhà cung cấp.
- Phiếu nhập và chi tiết phiếu nhập gắn với mã sản phẩm.
- Tài khoản và quyền hạn NV, QL, Admin.
- Các biểu mẫu nhập liệu.

5. LƯU Ý QUAN TRỌNG
Vì yêu cầu chỉ dùng HTML và CSS, website này là prototype giao diện. Không thể xử lý đăng nhập thật, thêm/sửa/xóa dữ liệu, tính giỏ hàng động, lọc tìm kiếm hoặc lưu đơn hàng. Những tính năng đó cần JavaScript và/hoặc backend, nhưng không được sử dụng trong phiên bản này.
Dữ liệu, giá tiền, tên người, thông tin liên hệ đều là dữ liệu minh họa.
