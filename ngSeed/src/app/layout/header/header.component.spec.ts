/* Copyright © Spearhead AG. All rights reserved.
Republication or redistribution of Spearheads Software content is prohibited
without the prior written consent of Spearhead AG.
ANY USE OF THIS CODE CONSTITUTES ACCEPTANCE OF THE TERMS OF THE COPYRIGHT NOTICE.
================================================================================
COPYRIGHT NOTICE
================================================================================
This code is proprietary software.
Proprietary software is computer software licensed under exclusive legal right
of the copyright holder.
If you have obtained a license from Spearhead you have been given the right to
use the software under certain conditions,but restricted from other uses, such
as modification, further distribution, or reverse engineering.
Copyright (c) 2017, Spearhead AG, Switzerland.
All rights reserved.
Redistribution and use in source and binary forms, with or without modification,
are not permitted.
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY
DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. */

import { APP_BASE_HREF } from '@angular/common';
import { TestBed, async, inject } from '@angular/core/testing';
import { AppModule } from '../../app.module';
import { HeaderComponent } from './header.component';
import { UserInfoService } from '../../core/auth/user-info.service';

describe('AppComponent', () => {
    let comp, fixture;
    const testUser = '<testUser>';
    let isLoggedInConst = true;

    const userInfoServiceStub = {
        isUserLogged() {
            return isLoggedInConst;
        },
        getUserInfo() {
            return { userName: testUser };
        }
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [AppModule],
            providers: [
                { provide: APP_BASE_HREF, useValue: '/' },
                { provide: UserInfoService, useValue: userInfoServiceStub }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(HeaderComponent);
        comp = fixture.debugElement.componentInstance;
        isLoggedInConst = true;
    }));

    it('should be initialized', () => {
        expect(comp).toBeTruthy();
    });

    it('#ms2-multi-lang exists in the header', () => {
        const nativeElement = fixture.nativeElement;
        const button = nativeElement.querySelector('ms2-multi-lang');
        expect(button).not.toBeNull();
    });

    describe('showNav', () => {
        it('should show the required elements when showNav=true', inject([], () => {

            const nativeElement = fixture.nativeElement;

            let buttonMinMenu = nativeElement.querySelector('.toggle-min > a');
            expect(buttonMinMenu).toBeNull();

            let buttonMenu = nativeElement.querySelector('.menu-button');
            expect(buttonMenu).toBeNull();

            comp.showNav = true;
            fixture.detectChanges();

            buttonMinMenu = nativeElement.querySelector('.toggle-min > a');
            expect(buttonMinMenu).not.toBeNull();

            buttonMenu = nativeElement.querySelector('.menu-button');
            expect(buttonMenu).not.toBeNull();
        }));
    });

    describe('onToggleOpenCloseNavMenu', () => {
        it('should emit event', inject([], () => {
            spyOn(comp.navCollapsed, 'emit');
            comp.showNav = true;
            fixture.detectChanges();

            // trigger the click
            const nativeElement = fixture.nativeElement;
            const button = nativeElement.querySelector('.toggle-min > a');
            button.dispatchEvent(new Event('click'));

            fixture.detectChanges();

            expect(comp.navCollapsed.emit).toHaveBeenCalledWith();
        }));
    });

    describe('onToggleOpenCloseNavMenuMobile', () => {
        it('#should emit event when', inject([], () => {
            spyOn(comp.navOpen, 'emit');
            comp.showNav = true;
            fixture.detectChanges();

            // trigger the click
            const nativeElement = fixture.nativeElement;
            const button = nativeElement.querySelector('.menu-button');
            button.dispatchEvent(new Event('click'));

            fixture.detectChanges();

            expect(comp.navOpen.emit).toHaveBeenCalledWith();
        }));
    });

    describe('logout button', () => {
        it('should show the logout button', inject([UserInfoService], (userInfoService: UserInfoService) => {

            comp.showLogout = true;
            fixture.detectChanges();

            const nativeElement = fixture.nativeElement;
            const button = nativeElement.querySelector('ms2-logout');
            expect(button).not.toBeNull();
        }));

        it('should hide the logout button when showLogout=false', inject([UserInfoService], (userInfoService: UserInfoService) => {

            comp.showLogout = false;
            fixture.detectChanges();

            const nativeElement = fixture.nativeElement;
            const button = nativeElement.querySelector('ms2-logout');
            expect(button).toBeNull();
        }));

        it('should hide the logout button when isLoggedIn()=false', inject([UserInfoService], (userInfoService: UserInfoService) => {

            comp.showLogout = true;
            isLoggedInConst = false;
            fixture.detectChanges();

            const nativeElement = fixture.nativeElement;
            const button = nativeElement.querySelector('ms2-logout');
            expect(button).toBeNull();
        }));
    });
});
