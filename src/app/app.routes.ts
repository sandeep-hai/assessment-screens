import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';
import { UserRole } from './core/models/user.model';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { LoginComponent } from './auth/login/login.component';
import { OtpVerificationComponent } from './auth/otp-verification/otp-verification.component';
import { StudentDashboardComponent } from './modules/student/dashboard/student-dashboard.component';
import { LecturerDashboardComponent } from './modules/lecturer/dashboard/lecturer-dashboard.component';
import { CollegeAdminDashboardComponent } from './modules/college-admin/dashboard/college-admin-dashboard.component';
import { AppAdminDashboardComponent } from './modules/app-admin/dashboard/app-admin-dashboard.component';

export const routes: Routes = [
  {
    path: 'auth/login',
    component: LoginComponent
  },
  {
    path: 'auth/verify-otp',
    component: OtpVerificationComponent
  },
  {
    path: 'student/dashboard',
    component: StudentDashboardComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { expectedRoles: [UserRole.STUDENT] }
  },
  {
    path: 'student',
    children: [
      { path: 'dashboard', component: StudentDashboardComponent },
      { path: '', loadChildren: () => import('./modules/student/student.module').then(m => m.StudentModule) }
    ],
    canActivate: [AuthGuard, RoleGuard],
    data: { expectedRoles: [UserRole.STUDENT] }
  },
  {
    path: 'lecturer/dashboard',
    component: LecturerDashboardComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { expectedRoles: [UserRole.LECTURER] }
  },
  {
    path: 'lecturer',
    children: [
      { path: 'dashboard', component: LecturerDashboardComponent },
      { path: '', loadChildren: () => import('./modules/lecturer/lecturer.module').then(m => m.LecturerModule) }
    ],
    canActivate: [AuthGuard, RoleGuard],
    data: { expectedRoles: [UserRole.LECTURER] }
  },
  {
    path: 'college-admin/dashboard',
    component: CollegeAdminDashboardComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { expectedRoles: [UserRole.COLLEGE_ADMIN] }
  },
  {
    path: 'college-admin',
    children: [
      { path: 'dashboard', component: CollegeAdminDashboardComponent },
      { path: '', loadChildren: () => import('./modules/college-admin/college-admin.module').then(m => m.CollegeAdminModule) }
    ],
    canActivate: [AuthGuard, RoleGuard],
    data: { expectedRoles: [UserRole.COLLEGE_ADMIN] }
  },
  {
    path: 'app-admin/dashboard',
    component: AppAdminDashboardComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { expectedRoles: [UserRole.APP_ADMIN] }
  },
  {
    path: 'app-admin',
    children: [
      { path: 'dashboard', component: AppAdminDashboardComponent },
      { path: '', loadChildren: () => import('./modules/app-admin/app-admin.module').then(m => m.AppAdminModule) }
    ],
    canActivate: [AuthGuard, RoleGuard],
    data: { expectedRoles: [UserRole.APP_ADMIN] }
  },
  {
    path: 'unauthorized',
    component: UnauthorizedComponent
  },
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/auth/login'
  }
];