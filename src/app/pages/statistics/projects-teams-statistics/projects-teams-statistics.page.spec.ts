import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProjectsTeamsStatisticsPage } from './projects-teams-statistics.page';

describe('ProjectsTeamsStatisticsPage', () => {
  let component: ProjectsTeamsStatisticsPage;
  let fixture: ComponentFixture<ProjectsTeamsStatisticsPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectsTeamsStatisticsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectsTeamsStatisticsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
