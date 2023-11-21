import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const AuthGuard: CanActivateFn = (route, state) => {
	const token = localStorage.getItem('tokenAttendance');
	const router = inject(Router);
	if (token) return true;
	else {
		localStorage.clear();
		router.navigate(['pages/selector-login']);
		return false;
	}
};
