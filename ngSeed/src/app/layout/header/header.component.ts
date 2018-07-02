import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from '@app/reducers';
import { isLoggedIn } from '@app/core/store/selectors/auth.selector';
import { Logout } from '@app/core/store/actions/auth.actions';
@Component({
    selector: 'q-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent {

    @Output() navCollapsed = new EventEmitter();
    @Output() navOpen = new EventEmitter();

    isLoggedIn$: Observable<boolean>;

    constructor(public store: Store<AppState>) { }

    ngOnInit() {
        this.isLoggedIn$ = this
            .store
            .pipe(
                select(isLoggedIn)
            );
    }

    onToggleOpenCloseNavMenu(): void {
        this.navCollapsed.emit();
    }

    onToggleOpenCloseNavMenuMobile(): void {
        this.navOpen.emit();
    }

    logout() {
        this.store.dispatch(new Logout());
      }
}
