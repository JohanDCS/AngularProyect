import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';

@Component({
	selector: 'app-selector-login',
	templateUrl: './selector-login.component.html',
	styleUrls: ['./selector-login.component.css'],
})
export class SelectorLoginComponent implements OnInit, OnDestroy {
	constructor(private renderer: Renderer2) {}
	ngOnInit(): void {
		this.renderer.addClass(document.body, 'body-for-selector-login');
	}
	ngOnDestroy(): void {
		this.renderer.removeClass(document.body, 'body-for-selector-login');
	}
}
