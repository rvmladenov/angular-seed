import { RendererModule } from './renderer.module';

describe('RendererModule', () => {
  let rendererModule: RendererModule;

  beforeEach(() => {
    rendererModule = new RendererModule();
  });

  it('should create an instance', () => {
    expect(rendererModule).toBeTruthy();
  });
});
