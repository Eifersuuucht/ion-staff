import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HttpTestPage } from './http-test.page';

describe('HttpTestPage', () => {
  let component: HttpTestPage;
  let fixture: ComponentFixture<HttpTestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HttpTestPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HttpTestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
