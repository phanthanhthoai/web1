(function(){
/* Dinh dang tien te trong toan bo khu vuc quan tri: 1.000.000 */
function formatVndInput(value){
  const digits=String(value||'').replace(/\D/g,'');
  if(!digits)return '';
  return digits.replace(/\B(?=(\d{3})+(?!\d))/g,'.');
}
function initAdminMoneyInputs(){
  if(!location.pathname.includes('/admin/'))return;
  document.querySelectorAll('input').forEach(input=>{
    const id=(input.id||'').toLowerCase();
    const name=(input.name||'').toLowerCase();
    const placeholder=(input.placeholder||'').toLowerCase();
    const label=input.id?document.querySelector('label[for="'+CSS.escape(input.id)+'"]'):null;
    const labelText=(label?label.textContent:'').toLowerCase();
    const context=[id,name,placeholder,labelText].join(' ');
    if(!/(giá|gia|price|amount|money|thành tiền|thanh tien|đơn giá|don gia)/i.test(context))return;
    input.type='text';
    input.inputMode='numeric';
    input.autocomplete='off';
    input.dataset.moneyFormat='vnd';
    input.placeholder=input.placeholder||'Nhập số tiền';
    input.value=formatVndInput(input.value);
    input.addEventListener('input',()=>{
      const formatted=formatVndInput(input.value);
      input.value=formatted;
      input.setSelectionRange(formatted.length,formatted.length);
    });
    input.addEventListener('blur',()=>{input.value=formatVndInput(input.value);});
  });
}
if(document.readyState==='loading'){
  document.addEventListener('DOMContentLoaded',initAdminMoneyInputs,{once:true});
}else{
  initAdminMoneyInputs();
}
const st=document.createElement('style');st.textContent='.site-toast{position:fixed;top:22px;right:22px;z-index:99999;min-width:260px;max-width:min(420px,calc(100vw - 32px));padding:14px 18px;background:#fff;border:1px solid #b7e4c7;border-left:5px solid #16a34a;border-radius:8px;box-shadow:0 8px 28px rgba(15,23,42,.16);color:#15803d;font-weight:600;opacity:0;transform:translateY(-10px);transition:.22s;pointer-events:none}.site-toast.show{opacity:1;transform:translateY(0)}.pagination .active{background:#1769aa;color:#fff;border-color:#1769aa}.pagination [aria-disabled="true"]{opacity:.4;pointer-events:none}';document.head.appendChild(st);
let timer;function toast(m){let n=document.querySelector('.site-toast');if(!n){n=document.createElement('div');n.className='site-toast';n.setAttribute('role','status');n.setAttribute('aria-live','polite');document.body.appendChild(n)}n.textContent=m;n.classList.add('show');clearTimeout(timer);timer=setTimeout(()=>n.classList.remove('show'),4500)}window.showSiteToast=toast;
function showPendingToast(){
  try {
    const pending=sessionStorage.getItem('techzone_pending_toast');
    if(pending){sessionStorage.removeItem('techzone_pending_toast');toast(pending);}
  } catch(_){}
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',showPendingToast,{once:true});
else showPendingToast();

document.addEventListener('submit',e=>{
  const f=e.target;
  if(!(f instanceof HTMLFormElement))return;
  // Admin filters are clickable mock controls only: no filtering, reload, or data changes.
  if(f.matches('[data-ui-only-filter]')){e.preventDefault();toast('Lọc thành công');return;}

  // Search intentionally navigates to the product listing; restore its toast after navigation.
  if(f.matches('.site-search,[role="search"]')){
    const input=f.querySelector('input[type="search"],input[name="q"]');
    if(input&&input.value.trim()){
      try{sessionStorage.setItem('techzone_pending_toast','Hoàn thành tìm kiếm');}catch(_){}
    }
    return;
  }

  // Gửi yêu cầu liên hệ: trở về trang chủ và hiển thị thông báo.
  if(location.pathname.endsWith('/contact.html')){
    e.preventDefault();
    try{
      sessionStorage.setItem(
        'techzone_pending_toast',
        'Gửi yêu cầu thành công'
      );
    }catch(_){}
    location.href='index.html';
    return;
  }

  // Xác nhận thanh toán: không bắt buộc nhập thông tin, trở về trang chủ.
  if(location.pathname.endsWith('/checkout.html')){
    e.preventDefault();
    try{
      sessionStorage.setItem(
        'techzone_pending_toast',
        'Đặt hàng thành công'
      );
    }catch(_){}
    location.href='index.html';
    return;
  }

  // Lưu hóa đơn: chuyển về danh sách đơn hàng và hiển thị thông báo tại trang đích.
  if(location.pathname.endsWith('/admin/form-invoice.html')){
    e.preventDefault();
    try{sessionStorage.setItem('techzone_pending_toast','Đã lưu hóa đơn thành công');}catch(_){}
    location.href='orders.html';
    return;
  }

  // Lưu sản phẩm: chuyển về danh sách sản phẩm và hiển thị thông báo.
  if(location.pathname.endsWith('/admin/form-product.html')){
      e.preventDefault();

      try{
          sessionStorage.setItem(
              'techzone_pending_toast',
              'Đã lưu sản phẩm thành công'
          );
      }catch(_){}

      location.href='products.html';
      return;
  }
  // Leave forms with their own explicit JavaScript handler alone (e.g. customer login).
  if(e.defaultPrevented)return;

  // Prevent action="#" or method="get" from reloading the page and jumping to its top.
  e.preventDefault();

  const button=f.querySelector('button[type="submit"],input[type="submit"],button:not([type])');
  const label=((button&&(button.innerText||button.value))||f.innerText||'').trim().toLowerCase();
  let message='Đã lưu thông tin thành công';
  if(/nhà cung cấp/.test(label))message='Đã lưu nhà cung cấp thành công';
  else if(/khách hàng/.test(label))message='Đã lưu khách hàng thành công';
  else if(/nhân viên/.test(label))message='Đã lưu nhân viên thành công';
  else if(/sản phẩm/.test(label))message='Đã lưu sản phẩm thành công';
  else if(/danh mục/.test(label))message='Đã lưu danh mục thành công';
  else if(/quyền/.test(label))message='Đã lưu quyền thành công';
  else if(/tài khoản/.test(label))message='Đã lưu tài khoản thành công';
  else if(/hóa đơn|phiếu nhập/.test(label))message='Đã lưu thông tin thành công';
  else if(/thanh toán|đặt hàng/.test(label))message='Đã thanh toán / đặt hàng thành công';
  else if(/gửi|liên hệ|đăng ký/.test(label))message='Đã gửi thông tin thành công';
  else if(/đăng nhập/.test(label))message='Đăng nhập thành công';
  toast(message);
});
document.addEventListener('click',e=>{let a=e.target.closest('a,button');if(!a)return;let l=(a.textContent||a.getAttribute('aria-label')||'').trim().toLowerCase();if(/^mua$|mua ngay|thêm vào giỏ/.test(l))toast('Đã thêm sản phẩm vào giỏ hàng');else if(/thêm khách hàng/.test(l))toast('Mở biểu mẫu thêm khách hàng');});
const grid=document.querySelector('main .grid'),nav=document.querySelector('main .pagination');
if(grid&&nav){
  const cards=[...grid.children],pages=5;
  const ranges=[[0,2],[2,4],[4,6],[6,7],[7,8]];
  let page=1;
  const nums=[...nav.querySelectorAll('.page-number')],arrows=[...nav.querySelectorAll('.page-arrow')];
  nums.forEach((n,i)=>{n.textContent=String(i+1);n.dataset.page=String(i+1);n.hidden=i>=pages;n.classList.remove('inert-page');n.tabIndex=0;n.setAttribute('role','button');n.setAttribute('aria-label','Trang '+(i+1));});
  arrows.forEach(a=>{a.classList.remove('inert-page');a.tabIndex=0;a.setAttribute('role','button');});
  function render(){
    const [from,to]=ranges[page-1];
    cards.forEach((card,i)=>{card.hidden=i<from||i>=to;});
    nums.forEach(n=>{const active=Number(n.dataset.page)===page;n.classList.toggle('active',active);n.setAttribute('aria-current',active?'page':'false');});
    arrows.forEach((a,i)=>a.setAttribute('aria-disabled',String(i===0?page===1:page===pages)));
  }
  function go(next){page=Math.max(1,Math.min(pages,next));render();grid.scrollIntoView({behavior:'smooth',block:'start'});}
  nums.forEach(n=>n.addEventListener('click',()=>go(Number(n.dataset.page))));
  arrows.forEach((a,i)=>a.addEventListener('click',()=>go(page+(i===0?-1:1))));
  nav.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){const t=e.target.closest('.page-number,.page-arrow');if(t){e.preventDefault();t.click();}}});
  render();
}

// Tai khoan dang nhap va trang thong tin ca nhan
function readStore(k, fallback){try{return localStorage.getItem(k)||fallback}catch(_){return fallback}}
function syncAccountNav(){
 const customer=readStore('techzone_customer',''), admin=readStore('techzone_admin','');
 // Khu vực Đăng nhập ở vị trí trước đây của thông báo miễn phí giao hàng.
 document.querySelectorAll('.customer-auth-slot').forEach(slot=>{
   if(customer){slot.innerHTML='<span>Xin chào, <strong>'+escapeHtml(customer)+'</strong></span> <a class="customer-logout-link" href="index.html" data-logout>Đăng xuất</a>';}
   else{slot.innerHTML='<a href="login.html">Đăng nhập</a>';}
 });
 document.querySelectorAll('.nav a[href="login.html"]').forEach(a=>{if(customer){a.textContent=customer;a.href='customer-profile.html';}});
 // Giữ nhãn 'Tài khoản' ở thanh điều hướng; tên khách hàng chỉ hiển thị trên topbar.
 document.querySelectorAll('.nav a[href="../login.html"]').forEach(a=>{if(admin){a.textContent=admin;a.href='profile.html';}});
 const topAdmin=document.getElementById('admin-top-name');if(topAdmin&&admin)topAdmin.textContent=admin;
 const cp=document.querySelector('[data-customer-profile]');
 if(cp){
   const name=customer||'Nguyễn Văn A';
   cp.innerHTML='<div class="admin-profile-intro"><div class="customer-profile-avatar" aria-hidden="true">👤</div><h2 class="customer-profile-name" id="customer-profile-heading">'+escapeHtml(name)+' <a class="customer-profile-logout" href="index.html" data-logout>Đăng xuất</a></h2><span class="tag">Đang hoạt động</span><p class="muted">Tài khoản khách hàng TechZone</p></div><form class="profile-edit-form" data-profile-edit><div class="admin-profile-fields">'+
   profileInput('Họ và tên','profile-name',name)+
   profileInput('Tên đăng nhập','profile-username',name,true)+
   profileInput('Loại tài khoản','profile-type','Khách hàng',true)+
   profileInput('Nhóm khách hàng','profile-group','Khách hàng cá nhân',true)+
   profileInput('Email','profile-email','',false,'email','Nhập email của bạn')+
   profileInput('Số điện thoại','profile-phone','',false,'tel','Nhập số điện thoại')+
   profileInput('Địa chỉ','profile-address','',false,'text','Nhập địa chỉ')+
   profileInput('Ngày tạo tài khoản','profile-created','Chưa cập nhật',true)+
   profileInput('Trạng thái tài khoản','profile-status','Đang hoạt động',true)+
   profileInput('Quyền truy cập','profile-role','Mua sắm và quản lý tài khoản',true)+
   '</div><div class="profile-edit-actions"><button class="btn" type="submit">Lưu thông tin</button></div></form>';
 }
 const ap=document.querySelector('[data-admin-profile]');
 if(ap){
   const name=admin||'Quản trị viên';
   ap.innerHTML='<div class="admin-profile-intro"><div class="admin-profile-avatar" aria-hidden="true">👤</div><h2 id="admin-profile-heading">'+escapeHtml(name)+'</h2><span class="tag">Đang hoạt động</span><p class="muted">Tài khoản quản trị hệ thống</p></div><form class="profile-edit-form" data-profile-edit><div class="admin-profile-fields">'+
   profileInput('Họ và tên','profile-name',name)+
   profileInput('Tên đăng nhập','profile-username','admin',true)+
   profileInput('Vai trò','profile-role','Quản trị viên',true)+
   profileInput('Bộ phận','profile-department','Quản trị hệ thống',true)+
   profileInput('Email','profile-email','admin@techzone.example',false,'email','Nhập email')+
   profileInput('Số điện thoại','profile-phone','',false,'tel','Nhập số điện thoại')+
   profileInput('Địa chỉ','profile-address','',false,'text','Nhập địa chỉ')+
   profileInput('Ngày tạo tài khoản','profile-created','Chưa cập nhật',true)+
   profileInput('Trạng thái tài khoản','profile-status','Đang hoạt động',true)+
   profileInput('Quyền truy cập','profile-access','Toàn quyền quản trị',true)+
   '</div><div class="profile-edit-actions"><button class="btn" type="submit">Lưu thông tin</button></div></form>';
 }
 // Nut Luu chi hien thi thong bao minh hoa.
 // Khong cap nhat ten tren ho so, loi chao, thanh dieu huong hay noi dung khac.
 // Cac o nhap van giu gia tri nguoi dung vua nhap cho den khi tai lai trang.
 document.querySelectorAll('[data-profile-edit]').forEach(form=>form.addEventListener('submit',e=>{
   e.preventDefault();
   toast('Đã lưu thông tin.');
 }));
}
function profileInput(label,name,value,readonly=false,type='text',placeholder='Chưa cập nhật'){
 const safe=escapeHtml(value||'');
 return '<label class="admin-profile-field profile-input-field"><span>'+escapeHtml(label)+'</span><input name="'+name+'" type="'+type+'" value="'+safe+'" placeholder="'+escapeHtml(placeholder)+'" '+(readonly?'readonly':'')+'></label>';
}
function escapeHtml(v){return String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
syncAccountNav();
document.addEventListener('click',e=>{const out=e.target.closest('[data-logout]');if(!out)return;e.preventDefault();const isAdmin=location.pathname.includes('/admin/');try{if(isAdmin){localStorage.removeItem('techzone_admin')}else{localStorage.removeItem('techzone_customer')}sessionStorage.setItem('techzone_pending_toast','Đã đăng xuất thành công');}catch(_){}location.href=isAdmin?'index.html':'index.html';});
// Tim kiem tren trang san pham: hien ket qua va thong bao ro rang
// if(location.pathname.endsWith('/products.html') && !location.pathname.includes('/admin/')){
//  const params=new URLSearchParams(location.search), q=(params.get('q')||'').trim().toLocaleLowerCase('vi');
//  const cards=[...document.querySelectorAll('main .grid .product')];
//  if(q){let count=0;cards.forEach(c=>{const ok=c.innerText.toLocaleLowerCase('vi').includes(q);c.hidden=!ok;if(ok)count++;});const box=document.createElement('div');box.className='search-results panel';box.innerHTML='<h2>Kết quả tìm kiếm</h2><p>Từ khóa: <b>'+escapeHtml(params.get('q'))+'</b></p><p>'+ (count?'Tìm thấy '+count+' sản phẩm phù hợp.':'Không tìm thấy sản phẩm phù hợp với từ khóa này.')+'</p>';const title=document.querySelector('main .page-title');if(title)title.after(box);}
// }
// Bo loc trong khu vuc quan tri chi la giao dien minh hoa, khong loc du lieu.
//  document.querySelectorAll('[data-ui-only-filter]').forEach(form=>{
//    form.addEventListener('submit',e=>e.preventDefault());
//  });
// Thao tac xem/sua/xoa dong du lieu khach hang, nhan vien, nha cung cap
 document.addEventListener('click',e=>{const b=e.target.closest('[data-row-view],[data-row-edit],[data-row-delete]');if(!b)return;const row=b.closest('tr');if(!row)return;const cells=[...row.cells].slice(0,-1);if(b.hasAttribute('data-row-delete')){toast('Xóa thành công.');return;}
if(b.hasAttribute('data-row-view')){
  const page=b.getAttribute('data-detail-page');
  if(page){
    location.href = page + '?id=KH001';
    return;
  }
}cells.forEach((c,i)=>{const old=c.innerText;const v=prompt('Chỉnh sửa thông tin '+(i+1)+':',old);if(v!==null)c.textContent=v;});toast('Đã cập nhật thông tin thành công');});

// Giỏ hàng: nút tăng/giảm và thao tác xóa chỉ mang tính giao diện.
document.addEventListener('click',e=>{const b=e.target.closest('.quantity-control button');if(b){const box=b.closest('.quantity-control'),input=box&&box.querySelector('input');if(input){const delta=b.textContent.trim()==='+'?1:-1;input.value=String(Math.max(1,(Number(input.value)||1)+delta));}return;}const del=e.target.closest('.cart-actions button');if(del){toast('Thao tác xóa là giao diện minh họa; sản phẩm chưa bị xóa.');}});
// Khu vực quản trị yêu cầu đăng nhập trước khi hiển thị trang quản trị.
if(location.pathname.includes('/admin/') && !location.pathname.endsWith('/admin-login.html') && !readStore('techzone_admin','')){location.replace('../admin-login.html');}

// Hien thi ten admin khi vao khu vuc quan tri

})();