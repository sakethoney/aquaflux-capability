import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have an empty message on init', () => {
    expect(component.message).toBe('');
  });

  it('should render the "Get backend message" button', () => {
    const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    expect(button).toBeTruthy();
    expect(button.textContent?.trim()).toBe('Get backend message');
  });

  it('should render the idle placeholder before any request', () => {
    const idle = fixture.nativeElement.querySelector('.response.idle');
    expect(idle).toBeTruthy();
    expect(idle.textContent).toContain('No request yet');
  });

  it('should populate message on a successful backend response', fakeAsync(async () => {
    const mockFetch = jasmine.createSpy('fetch').and.returnValue(
      Promise.resolve({
        json: () => Promise.resolve({ message: 'Hello from Spring Boot' }),
      } as Response)
    );
    spyOn(window, 'fetch').and.callFake(mockFetch);

    await component.loadMessage();
    fixture.detectChanges();

    expect(component.message).toBe('Hello from Spring Boot');
    const responseEl = fixture.nativeElement.querySelector('.response strong');
    expect(responseEl).toBeTruthy();
  }));

  it('should set a fallback message when fetch throws a network error', async () => {
    spyOn(window, 'fetch').and.returnValue(Promise.reject(new Error('Network error')));

    await component.loadMessage();
    fixture.detectChanges();

    expect(component.message).toBe('Unable to reach backend service');
  });

  it('should use the correct API path to call the backend', async () => {
    let capturedUrl = '';
    spyOn(window, 'fetch').and.callFake((url: RequestInfo | URL) => {
      capturedUrl = String(url);
      return Promise.reject(new Error('cancelled'));
    });

    await component.loadMessage();

    expect(capturedUrl).toContain('/api/hello');
  });
});
