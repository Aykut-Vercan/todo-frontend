import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      // ============ NAVBAR ============
      "nav.todoPanel": "Todo Panel",
      "nav.adminPanel": "Admin Panel",
      "nav.settings": "Settings",
      "nav.logout": "Logout",
      "nav.lightMode": "Light Mode",
      "nav.darkMode": "Dark Mode",
      "nav.admin": "Admin",

      // ============ DASHBOARD ============
      "dashboard.title": "My Todos",
      "dashboard.addTodo": "Add Todo",
      "dashboard.all": "All",
      "dashboard.active": "Active",
      "dashboard.completed": "Completed",
      "dashboard.searchPlaceholder": "Search todos...",
      "dashboard.allPriorities": "All Priorities",
      "dashboard.priority": "Priority",
      "dashboard.loading": "Loading...",
      "dashboard.error": "Failed to load todos. Please try again.",
      "dashboard.noFilteredTodos": "No {{filter}} todos",
      "dashboard.allCompleted": "All your todos are completed!",
      "dashboard.noCompletedYet": "No completed todos yet",
      "dashboard.noTodos": "No todos yet",
      "dashboard.getStarted": "Get started by creating your first todo!",
      "dashboard.createTodo": "Create Todo",

      // Delete Modal
      "dashboard.deleteTitle": "Delete Todo?",
      "dashboard.deleteDesc": "Are you sure you want to delete this todo? This action cannot be undone.",
      "dashboard.delete": "Delete",
      "dashboard.cancel": "Cancel",

      // ============ ADMIN DASHBOARD ============
      "admin.title": "Admin Dashboard",
      "admin.subtitle": "Manage users and permissions",
      "admin.loading": "Loading...",
      "admin.error": "Failed to load users. Please try again.",
      "admin.user": "User",
      "admin.email": "Email",
      "admin.role": "Role",
      "admin.actions": "Actions",
      "admin.admin": "Admin",
      "admin.employee": "Employee",
      "admin.promoteTitle": "Promote to Admin",
      "admin.deleteTitle": "Delete User",
      "admin.promote": "Promote",
      "admin.delete": "Delete",

      // Promote Modal
      "admin.promoteModalTitle": "Promote to Admin?",
      "admin.promoteModalDesc": "This user will gain full admin privileges. Are you sure?",
      "admin.promoteConfirm": "Promote",
      "admin.promoteCancel": "Cancel",

      // Delete Modal
      "admin.deleteModalTitle": "Delete User?",
      "admin.deleteModalDesc": "This action cannot be undone. The user will be permanently removed from the system.",
      "admin.deleteConfirm": "Delete",
      "admin.deleteCancel": "Cancel",

      // ============ LOGIN ============
      "login.welcome": "Welcome",
      "login.email": "Email Address",
      "login.emailPlaceholder": "you@example.com",
      "login.password": "Password",
      "login.passwordPlaceholder": "Enter your password",
      "login.loggingIn": "Logging in...",
      "login.loginButton": "Login",
      "login.noAccount": "Don't have an account?",
      "login.registerHere": "Register here",

      // Validation Errors
      "login.emailRequired": "Email is required",
      "login.emailInvalid": "Invalid email format",
      "login.passwordMin": "Password must be at least 5 characters",
      "login.passwordMax": "Password must be maximum 30 characters",

      // ============ REGISTER ============
      "register.title": "Create Account",
      "register.firstName": "First Name",
      "register.firstNamePlaceholder": "John",
      "register.lastName": "Last Name",
      "register.lastNamePlaceholder": "Doe",
      "register.email": "Email Address",
      "register.emailPlaceholder": "you@example.com",
      "register.password": "Password",
      "register.passwordPlaceholder": "Enter your password",
      "register.creating": "Creating Account...",
      "register.registerButton": "Register",
      "register.haveAccount": "Already have an account?",
      "register.loginHere": "Login here",
      "register.success": "Account created successfully! Redirecting to login...",

      // Validation Errors
      "register.firstNameMin": "First name must be at least 3 characters",
      "register.firstNameMax": "First name must be maximum 30 characters",
      "register.lastNameMin": "Last name must be at least 3 characters",
      "register.lastNameMax": "Last name must be maximum 30 characters",
      "register.emailRequired": "Email is required",
      "register.emailInvalid": "Invalid email format",
      "register.passwordMin": "Password must be at least 5 characters",
      "register.passwordMax": "Password must be maximum 30 characters",

      // ============ USER SETTINGS ============
      "settings.title": "Account Settings",
      "settings.subtitle": "Manage your account preferences",
      "settings.profileInfo": "Profile Information",
      "settings.fullName": "Full Name",
      "settings.email": "Email",
      "settings.role": "Role",
      "settings.changePassword": "Change Password",
      "settings.currentPassword": "Current Password",
      "settings.newPassword": "New Password",
      "settings.confirmPassword": "Confirm New Password",
      "settings.updating": "Updating...",
      "settings.updateButton": "Update Password",
      "settings.successMessage": "Password updated successfully!",
      "settings.dangerZone": "Danger Zone",
      "settings.dangerDesc": "Once you delete your account, there is no going back. Please be certain.",
      "settings.deleteAccount": "Delete Account",

      // Validation Errors
      "settings.oldPasswordMin": "Old password must be at least 5 characters",
      "settings.oldPasswordMax": "Old password must be maximum 30 characters",
      "settings.newPasswordMin": "New password must be at least 5 characters",
      "settings.newPasswordMax": "New password must be maximum 30 characters",
      "settings.passwordsDontMatch": "Passwords don't match",
      "settings.updateFailed": "Failed to update password",

      // Delete Modal
      "settings.deleteModalTitle": "Delete Account?",
      "settings.deleteModalDesc": "This action cannot be undone. All your data including todos will be permanently deleted.",
      "settings.deleteConfirm": "Delete Account",
      "settings.deleteCancel": "Cancel",

      // ============ ADD TODO MODAL ============
      "addTodo.title": "Add New Todo",
      "addTodo.todoTitle": "Title",
      "addTodo.titlePlaceholder": "e.g., Buy groceries",
      "addTodo.description": "Description",
      "addTodo.descriptionPlaceholder": "e.g., Milk, eggs, bread...",
      "addTodo.priority": "Priority",
      "addTodo.priority1": "Priority 1 (Lowest)",
      "addTodo.priority2": "Priority 2 (Low)",
      "addTodo.priority3": "Priority 3 (Medium)",
      "addTodo.priority4": "Priority 4 (High)",
      "addTodo.priority5": "Priority 5 (Highest)",
      "addTodo.cancel": "Cancel",
      "addTodo.adding": "Adding...",
      "addTodo.addButton": "Add Todo",

      // Validation Errors
      "addTodo.titleMin": "Title must be at least 3 characters",
      "addTodo.titleMax": "Title must be maximum 30 characters",
      "addTodo.descriptionMin": "Description must be at least 3 characters",
      "addTodo.descriptionMax": "Description must be maximum 30 characters",
      "addTodo.priorityRange": "Priority must be between 1-5",

      // ============ PROTECTED ROUTE ============
      "protected.loading": "Loading...",
      "protected.accessDenied": "Access Denied",
      "protected.noPermission": "You don't have permission to access this page.",

      // ============ CONFIRM MODAL ============
      "modal.confirm": "Confirm",
      "modal.cancel": "Cancel",
      "modal.processing": "Processing...",
      // ============ TOAST MESSAGES ============
      "toast.todoAdded": "Todo added successfully!",
      "toast.todoDeleted": "Todo deleted!",
      "toast.todoUpdated": "Todo updated!",
      "toast.todoError": "Failed to add todo",
      "toast.deleteError": "Failed to delete todo",
      "toast.passwordUpdated": "Password updated successfully!",
      "toast.passwordError": "Failed to update password",
      "toast.accountDeleted": "Account deleted successfully",
      "toast.userPromoted": "User promoted to admin",
      "toast.userDeleted": "User deleted",
      "toast.promoteError": "Failed to promote user",
      "toast.deleteUserError": "Failed to delete user",
      "toast.loginError": "Login failed. Please check your credentials",
      "toast.registerError": "Registration failed. Please try again",
    }
  },
  tr: {
    translation: {
      // ============ NAVBAR ============
      "nav.todoPanel": "Todo Paneli",
      "nav.adminPanel": "Admin Paneli",
      "nav.settings": "Ayarlar",
      "nav.logout": "Çıkış Yap",
      "nav.lightMode": "Açık Mod",
      "nav.darkMode": "Koyu Mod",
      "nav.admin": "Admin",

      // ============ DASHBOARD ============
      "dashboard.title": "Yapılacaklarım",
      "dashboard.addTodo": "Ekle",
      "dashboard.all": "Tümü",
      "dashboard.active": "Aktif",
      "dashboard.completed": "Tamamlanan",
      "dashboard.searchPlaceholder": "Yapılacak ara...",
      "dashboard.allPriorities": "Tüm Öncelikler",
      "dashboard.priority": "Öncelik",
      "dashboard.loading": "Yükleniyor...",
      "dashboard.error": "Yapılacaklar yüklenemedi. Lütfen tekrar deneyin.",
      "dashboard.noFilteredTodos": "{{filter}} yapılacak yok",
      "dashboard.allCompleted": "Tüm yapılacaklarınız tamamlandı!",
      "dashboard.noCompletedYet": "Henüz tamamlanan yapılacak yok",
      "dashboard.noTodos": "Henüz yapılacak yok",
      "dashboard.getStarted": "İlk yapılacağınızı oluşturarak başlayın!",
      "dashboard.createTodo": "Yapılacak Oluştur",

      // Delete Modal
      "dashboard.deleteTitle": "Yapılacak Silinsin mi?",
      "dashboard.deleteDesc": "Bu yapılacağı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.",
      "dashboard.delete": "Sil",
      "dashboard.cancel": "İptal",

      // ============ ADMIN DASHBOARD ============
      "admin.title": "Admin Paneli",
      "admin.subtitle": "Kullanıcıları ve yetkileri yönetin",
      "admin.loading": "Yükleniyor...",
      "admin.error": "Kullanıcılar yüklenemedi. Lütfen tekrar deneyin.",
      "admin.user": "Kullanıcı",
      "admin.email": "E-posta",
      "admin.role": "Rol",
      "admin.actions": "İşlemler",
      "admin.admin": "Admin",
      "admin.employee": "Çalışan",
      "admin.promoteTitle": "Admin Yap",
      "admin.deleteTitle": "Kullanıcıyı Sil",
      "admin.promote": "Yükselt",
      "admin.delete": "Sil",

      // Promote Modal
      "admin.promoteModalTitle": "Admin Yapılsın mı?",
      "admin.promoteModalDesc": "Bu kullanıcı tam admin yetkisi kazanacak. Emin misiniz?",
      "admin.promoteConfirm": "Yükselt",
      "admin.promoteCancel": "İptal",

      // Delete Modal
      "admin.deleteModalTitle": "Kullanıcı Silinsin mi?",
      "admin.deleteModalDesc": "Bu işlem geri alınamaz. Kullanıcı sistemden kalıcı olarak silinecek.",
      "admin.deleteConfirm": "Sil",
      "admin.deleteCancel": "İptal",

      // ============ LOGIN ============
      "login.welcome": "Hoş Geldiniz",
      "login.email": "E-posta Adresi",
      "login.emailPlaceholder": "ornek@email.com",
      "login.password": "Şifre",
      "login.passwordPlaceholder": "Şifrenizi girin",
      "login.loggingIn": "Giriş yapılıyor...",
      "login.loginButton": "Giriş Yap",
      "login.noAccount": "Hesabınız yok mu?",
      "login.registerHere": "Buradan kayıt olun",

      // Validation Errors
      "login.emailRequired": "E-posta gereklidir",
      "login.emailInvalid": "Geçersiz e-posta formatı",
      "login.passwordMin": "Şifre en az 5 karakter olmalıdır",
      "login.passwordMax": "Şifre en fazla 30 karakter olmalıdır",

      // ============ REGISTER ============
      "register.title": "Hesap Oluştur",
      "register.firstName": "Ad",
      "register.firstNamePlaceholder": "Ahmet",
      "register.lastName": "Soyad",
      "register.lastNamePlaceholder": "Yılmaz",
      "register.email": "E-posta Adresi",
      "register.emailPlaceholder": "ornek@email.com",
      "register.password": "Şifre",
      "register.passwordPlaceholder": "Şifrenizi girin",
      "register.creating": "Hesap oluşturuluyor...",
      "register.registerButton": "Kayıt Ol",
      "register.haveAccount": "Zaten hesabınız var mı?",
      "register.loginHere": "Buradan giriş yapın",
      "register.success": "Hesap başarıyla oluşturuldu! Giriş sayfasına yönlendiriliyorsunuz...",

      // Validation Errors
      "register.firstNameMin": "Ad en az 3 karakter olmalıdır",
      "register.firstNameMax": "Ad en fazla 30 karakter olmalıdır",
      "register.lastNameMin": "Soyad en az 3 karakter olmalıdır",
      "register.lastNameMax": "Soyad en fazla 30 karakter olmalıdır",
      "register.emailRequired": "E-posta gereklidir",
      "register.emailInvalid": "Geçersiz e-posta formatı",
      "register.passwordMin": "Şifre en az 5 karakter olmalıdır",
      "register.passwordMax": "Şifre en fazla 30 karakter olmalıdır",

      // ============ USER SETTINGS ============
      "settings.title": "Hesap Ayarları",
      "settings.subtitle": "Hesap tercihlerinizi yönetin",
      "settings.profileInfo": "Profil Bilgileri",
      "settings.fullName": "Ad Soyad",
      "settings.email": "E-posta",
      "settings.role": "Rol",
      "settings.changePassword": "Şifre Değiştir",
      "settings.currentPassword": "Mevcut Şifre",
      "settings.newPassword": "Yeni Şifre",
      "settings.confirmPassword": "Yeni Şifre Tekrar",
      "settings.updating": "Güncelleniyor...",
      "settings.updateButton": "Şifreyi Güncelle",
      "settings.successMessage": "Şifre başarıyla güncellendi!",
      "settings.dangerZone": "Tehlikeli Bölge",
      "settings.dangerDesc": "Hesabınızı sildikten sonra geri dönüş yoktur. Lütfen emin olun.",
      "settings.deleteAccount": "Hesabı Sil",

      // Validation Errors
      "settings.oldPasswordMin": "Eski şifre en az 5 karakter olmalıdır",
      "settings.oldPasswordMax": "Eski şifre en fazla 30 karakter olmalıdır",
      "settings.newPasswordMin": "Yeni şifre en az 5 karakter olmalıdır",
      "settings.newPasswordMax": "Yeni şifre en fazla 30 karakter olmalıdır",
      "settings.passwordsDontMatch": "Şifreler eşleşmiyor",
      "settings.updateFailed": "Şifre güncellenemedi",

      // Delete Modal
      "settings.deleteModalTitle": "Hesap Silinsin mi?",
      "settings.deleteModalDesc": "Bu işlem geri alınamaz. Yapılacaklar dahil tüm verileriniz kalıcı olarak silinecek.",
      "settings.deleteConfirm": "Hesabı Sil",
      "settings.deleteCancel": "İptal",

      // ============ ADD TODO MODAL ============
      "addTodo.title": "Yeni Yapılacak Ekle",
      "addTodo.todoTitle": "Başlık",
      "addTodo.titlePlaceholder": "örn., Market alışverişi",
      "addTodo.description": "Açıklama",
      "addTodo.descriptionPlaceholder": "örn., Süt, yumurta, ekmek...",
      "addTodo.priority": "Öncelik",
      "addTodo.priority1": "Öncelik 1 (En Düşük)",
      "addTodo.priority2": "Öncelik 2 (Düşük)",
      "addTodo.priority3": "Öncelik 3 (Orta)",
      "addTodo.priority4": "Öncelik 4 (Yüksek)",
      "addTodo.priority5": "Öncelik 5 (En Yüksek)",
      "addTodo.cancel": "İptal",
      "addTodo.adding": "Ekleniyor...",
      "addTodo.addButton": "Yapılacak Ekle",

      // Validation Errors
      "addTodo.titleMin": "Başlık en az 3 karakter olmalıdır",
      "addTodo.titleMax": "Başlık en fazla 30 karakter olmalıdır",
      "addTodo.descriptionMin": "Açıklama en az 3 karakter olmalıdır",
      "addTodo.descriptionMax": "Açıklama en fazla 30 karakter olmalıdır",
      "addTodo.priorityRange": "Öncelik 1-5 arasında olmalıdır",

      // ============ PROTECTED ROUTE ============
      "protected.loading": "Yükleniyor...",
      "protected.accessDenied": "Erişim Reddedildi",
      "protected.noPermission": "Bu sayfaya erişim yetkiniz yok.",

      // ============ CONFIRM MODAL ============
      "modal.confirm": "Onayla",
      "modal.cancel": "İptal",
      "modal.processing": "İşleniyor...",
      // ============ TOAST MESSAGES ============
      "toast.todoAdded": "Yapılacak başarıyla eklendi!",
      "toast.todoDeleted": "Yapılacak silindi!",
      "toast.todoUpdated": "Yapılacak güncellendi!",
      "toast.todoError": "Yapılacak eklenemedi",
      "toast.deleteError": "Yapılacak silinemedi",
      "toast.passwordUpdated": "Şifre başarıyla güncellendi!",
      "toast.passwordError": "Şifre güncellenemedi",
      "toast.accountDeleted": "Hesap başarıyla silindi",
      "toast.userPromoted": "Kullanıcı admin yapıldı",
      "toast.userDeleted": "Kullanıcı silindi",
      "toast.promoteError": "Kullanıcı yükseltilemedi",
      "toast.deleteUserError": "Kullanıcı silinemedi",
      "toast.loginError": "Giriş başarısız. Bilgilerinizi kontrol edin",
      "toast.registerError": "Kayıt başarısız. Lütfen tekrar deneyin",
    }
  }
} as const;

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'tr',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;