import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RendererComponent } from './renderer.component';
import { RendererRouting } from '@app/renderer/renderer-routing.module';

@NgModule({
  imports: [
    CommonModule,
    RendererRouting
  ],
  declarations: [RendererComponent],
  exports: [RendererComponent]
})
export class RendererModule { }
