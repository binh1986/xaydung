/* ================================================================
   FILE: js/main.js
   Chức năng 1: mở / đóng menu trên màn hình nhỏ.
   Chức năng 2: tìm nhóm thí nghiệm, hỗ trợ gõ không dấu.

   Đây là JavaScript thuần, không cần jQuery hoặc thư viện ngoài.
   Dùng var và function theo lối viết truyền thống để dễ theo dõi.
   HTML tải file này ở cuối trang bằng thẻ script.
   ================================================================ */

/* ----------------------------------------------------------------
   PHẦN 1. LẤY CÁC THÀNH PHẦN MENU TỪ HTML
   querySelector() tìm phần tử đầu tiên khớp bộ chọn.
   Dấu chấm chọn class; dấu # chọn id.
   ---------------------------------------------------------------- */
var nutMenu = document.querySelector('.menu-toggle');
var thanhMenu = document.querySelector('#navigation');

/* Chỉ chạy khi trang có đủ cả nút và menu. */
if (nutMenu && thanhMenu) {

    /* Hàm dùng chung: đóng menu và báo trạng thái cho trình đọc màn hình. */
    function dongMenu() {
        thanhMenu.classList.remove('open');
        nutMenu.setAttribute('aria-expanded', 'false');
    }

    /* Khi bấm nút Menu, đảo trạng thái hiện tại. */
    nutMenu.addEventListener('click', function () {
        var dangMo = nutMenu.getAttribute('aria-expanded') === 'true';

        if (dangMo) {
            dongMenu();
        } else {
            thanhMenu.classList.add('open');
            nutMenu.setAttribute('aria-expanded', 'true');
        }
    });

    /* Sau khi chọn một liên kết, đóng menu trên điện thoại. */
    var cacLienKet = thanhMenu.querySelectorAll('a');

    for (var i = 0; i < cacLienKet.length; i++) {
        cacLienKet[i].addEventListener('click', dongMenu);
    }

    /* Nhấn phím Escape cũng đóng menu. */
    document.addEventListener('keydown', function (suKien) {
        if (suKien.key === 'Escape') {
            dongMenu();
        }
    });
}

/* ----------------------------------------------------------------
   PHẦN 2. CHUẨN HÓA TIẾNG VIỆT ĐỂ TÌM KHÔNG DẤU
   Ví dụ: "Cơ lý đất" được đổi thành "co ly dat" khi so sánh.
   Chữ hiển thị trong HTML vẫn giữ nguyên dấu tiếng Việt.
   ---------------------------------------------------------------- */
function boDauTiengViet(chuoi) {
    return chuoi
        .normalize('NFD')                      // Tách chữ và dấu.
        .replace(/[\u0300-\u036f]/g, '')      // Loại bỏ dấu đã tách.
        .replace(/đ/g, 'd')                    // Xử lý riêng chữ đ.
        .replace(/Đ/g, 'D')
        .toLowerCase();                        // Không phân biệt hoa/thường.
}

/* ----------------------------------------------------------------
   PHẦN 3. LỌC DANH MỤC THÍ NGHIỆM
   Các id/class dưới đây phải khớp với HTML:
   #service-search : ô nhập từ khóa.
   .service        : từng nhóm thí nghiệm.
   #no-results     : thông báo không tìm thấy.
   ---------------------------------------------------------------- */
var oTimKiem = document.querySelector('#service-search');
var thongBao = document.querySelector('#no-results');

/* Một số trang không có ô tìm kiếm nên phải kiểm tra trước. */
if (oTimKiem && thongBao) {
    oTimKiem.addEventListener('input', function () {
        var tuKhoa = boDauTiengViet(oTimKiem.value.trim());
        var cacNhom = document.querySelectorAll('.service');
        var soNhomTimThay = 0;

        for (var j = 0; j < cacNhom.length; j++) {
            var nhom = cacNhom[j];
            var tenNhom = boDauTiengViet(nhom.textContent);
            var phuHop = tenNhom.indexOf(tuKhoa) !== -1;

            /* hidden = true: ẩn; hidden = false: hiện. */
            nhom.hidden = !phuHop;

            if (phuHop) {
                soNhomTimThay = soNhomTimThay + 1;
            }
        }

        /* Chỉ hiện thông báo khi không có nhóm phù hợp. */
        thongBao.hidden = soNhomTimThay > 0;
    });
}
