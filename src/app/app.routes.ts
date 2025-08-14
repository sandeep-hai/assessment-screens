import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';
import { UserRole } from './core/models/user.model';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'student',
    loadChildren: () => import('./modules/student/student.module').then(m => m.StudentModule),
    canActivate: [AuthGuard, RoleGuard],
    data: { expectedRoles: [UserRole.STUDENT] }
  },
  {
    path: 'lecturer',
    loadChildren: () => import('./modules/lecturer/lecturer.module').then(m => m.LecturerModule),
    canActivate: [AuthGuard, RoleGuard],
    data: { expectedRoles: [UserRole.LECTURER] }
  },
  {
    path: 'college-admin',
    loadChildren: () => import('./modules/college-admin/college-admin.module').then(m => m.CollegeAdminModule),
    canActivate: [AuthGuard, RoleGuard],
    data: { expectedRoles: [UserRole.COLLEGE_ADMIN] }
  },
  {
    path: 'app-admin',
    loadChildren: () => import('./modules/app-admin/app-admin.module').then(m => m.AppAdminModule),
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

export { routes }