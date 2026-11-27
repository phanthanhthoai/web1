TECHZONE - WEBSITE BÁN HÀNG MÁY TÍNH (STATIC FRONTEND DEMO)
==========================================================

1. PHẠM VI
- Giao diện tham khảo phong cách project LTWeb: nền sáng, tông xanh navy/xanh dương, điểm nhấn vàng và thẻ bo góc.
- Chỉ sử dụng HTML5, CSS3 và JavaScript thuần.
- Không sử dụng Backend, API, PHP, Java, Node.js server, MySQL hoặc cơ sở dữ liệu.
- Không dùng localStorage, sessionStorage hoặc cơ chế lưu dữ liệu phía trình duyệt.
- Sản phẩm, khách hàng, nhân viên và đơn hàng là dữ liệu mẫu cố định.
- JavaScript chỉ hỗ trợ điều hướng, mở form, xem chi tiết, xem trước ảnh, thay đổi số lượng trong trang hiện tại và hiển thị toast mô phỏng.
- Form tìm kiếm nâng cao ở trang Sản phẩm chỉ là giao diện minh họa; bấm Tìm kiếm không thực hiện truy vấn hoặc lọc sản phẩm.

2. CÁCH CHẠY
1) Giải nén ZIP.
2) Mở thư mục project bằng VS Code.
3) Mở index.html trực tiếp bằng trình duyệt hoặc chạy bằng VS Code Live Server.
4) Khu vực quản trị: mở admin-login.html.

3. LUỒNG ĐĂNG NHẬP / ĐĂNG KÝ
- Đăng nhập khách hàng: form chỉ là giao diện; bấm Đăng nhập sẽ chuyển đến home-logged-in.html.
- Đăng ký khách hàng: form chỉ là giao diện; bấm Đăng ký sẽ quay về index.html.
- Đăng nhập Admin: form chỉ là giao diện; bấm Đăng nhập sẽ mở admin/index.html.
- Không có bước xác thực tài khoản hoặc tạo tài khoản thật.

4. LUỒNG NGƯỜI MUA
Trang chủ -> Đăng nhập/Đăng ký -> Trang chủ -> Sản phẩm / Tìm kiếm -> Chi tiết sản phẩm -> Giỏ hàng mẫu -> Thanh toán mẫu -> Xác nhận -> Chi tiết đơn hàng / Lịch sử mua hàng.
- Thanh tìm kiếm cơ bản theo tên sản phẩm có minh họa lọc danh sách.
- Tìm kiếm nâng cao gồm tên, danh mục và khoảng giá chỉ hiển thị giao diện; không thực hiện tìm kiếm.
- Phân trang chỉ hiển thị các ô số trang minh họa; bấm số trang không chuyển trang hoặc thay đổi dữ liệu.
- Giỏ hàng có dữ liệu mẫu riêng. Tăng/giảm số lượng chỉ cập nhật tổng tiền trong trang giỏ hàng hiện tại.
- Địa chỉ và hình thức thanh toán chỉ minh họa; không phát sinh đơn hàng thật.

5. LUỒNG QUẢN TRỊ
Đăng nhập Admin -> Tổng quan / Sản phẩm / Danh mục / Đơn hàng / Khách hàng / Nhân viên / Nhà cung cấp / Phiếu nhập.
- Tổng quan: hiển thị KPI, biểu đồ và top 5 khách hàng mua nhiều nhất.
- Sản phẩm: xem danh sách, các ô lọc chỉ mang tính giao diện; có liên kết mở trang Quản lý danh mục. Nút Xem chi tiết mở trang bán hàng của sản phẩm tương ứng (SP001 là Laptop ASUS Vivobook 15). Form thêm/sửa chỉ gồm thông tin sản phẩm, danh mục, bảo hành, mô tả và hình ảnh; không nhập giá nhập, giá bán hoặc số lượng ở hồ sơ sản phẩm.
- Danh mục: quản lý 5 nhóm mẫu gồm Laptop, Máy tính bộ, Linh kiện, Phụ kiện và Màn hình; có danh sách, tìm trong danh sách, biểu mẫu thêm/chỉnh sửa và ô phân trang tĩnh. Danh mục trong module này thống nhất với dropdown ở form sản phẩm và bộ lọc danh sách sản phẩm.
- Khách hàng: danh sách mẫu; thêm/sửa/xóa/khóa/mở khóa điều hướng về trang danh sách và hiển thị toast CSS, không cập nhật dữ liệu mẫu.
- Nhân viên: danh sách mẫu; thêm/sửa/xóa/khóa/mở khóa điều hướng về trang danh sách và hiển thị toast CSS, không cập nhật dữ liệu mẫu.
- Nhà cung cấp: xem danh sách, các ô lọc chỉ mang tính giao diện, xem chi tiết và mở biểu mẫu thêm/chỉnh sửa; thêm/sửa/xóa/ngừng hợp tác chỉ điều hướng và hiển thị toast CSS.
- Phiếu nhập: chọn nhà cung cấp, nhân viên, sản phẩm, số lượng nhập, đơn giá nhập và giá bán; tính tổng giá trị nhập minh họa.
- Giá nhập, giá bán và số lượng thuộc phiếu nhập, không thuộc form thêm sản phẩm. Ô giá trong Admin tự định dạng VND với dấu chấm phân tách hàng nghìn.
- Đơn hàng: dropdown Trạng thái đơn hàng và các ô lọc chỉ là điều khiển giao diện; không lọc hoặc thay đổi dữ liệu; xem chi tiết đơn.
- Thông tin đơn hàng chỉ được xem, không có trường chỉnh sửa.
- Trạng thái đơn hàng không thể cập nhật. Dropdown trạng thái ở danh sách đơn hàng chỉ dùng để lọc.
- Phân trang ở các danh sách chỉ là ô hiển thị minh họa, không có chức năng chuyển trang.

6. LƯU Ý
Đây là prototype giao diện tĩnh phục vụ trình bày. Các dữ liệu và thao tác không được lưu hoặc đồng bộ sau khi chuyển trang/tải lại. Không có thanh toán hay giao dịch thật.

7. THÔNG BÁO MÔ PHỎNG
- Các thao tác Thêm/Sửa/Xóa/Tìm kiếm/đổi trạng thái trong Admin sử dụng liên kết hoặc form GET điều hướng sang trang đích kèm mã #toast-...; toast được hiển thị hoàn toàn bằng HTML/CSS qua :target và animation, không cần JavaScript. Không bắt buộc nhập dữ liệu, không kiểm tra hợp lệ, không cập nhật dữ liệu mẫu và không ghi dữ liệu.
- Bộ lọc trong Admin gửi GET sang trang danh sách với toast CSS; danh sách mẫu không bị lọc.
- Nút Khóa/Mở khóa và các thao tác trạng thái chỉ điều hướng về trang danh sách, hiển thị toast CSS; trạng thái dữ liệu mẫu không thay đổi.
- Các ô tiền trong Admin hiển thị định dạng VND có dấu chấm phân tách hàng nghìn, ví dụ 1.000.000.
- Nút Xem chi tiết trong quản lý sản phẩm mở trang bán hàng của sản phẩm tương ứng; SP001 là Laptop ASUS Vivobook 15.
- Không dùng localStorage, sessionStorage hoặc bất kỳ cơ chế lưu dữ liệu trình duyệt nào.

8. TOAST CSS-ONLY
- Mỗi trang Admin chứa các phần tử HTML toast cố định, được hiển thị hoàn toàn bằng CSS :target và animation.
- Các thao tác Thêm/Sửa/Xóa/đổi trạng thái dùng liên kết điều hướng về trang danh sách kèm mã thao tác và fragment #toast-...; tìm kiếm dùng form GET với #toast-search.
- JavaScript không tạo, bật hoặc ẩn toast Admin. JavaScript vẫn có thể dựng dữ liệu mẫu hoặc điền trước biểu mẫu, nhưng không xử lý thông báo thành công.
- Tất cả thao tác chỉ mô phỏng giao diện; không ghi, không đồng bộ và không thay đổi dữ liệu gốc.
