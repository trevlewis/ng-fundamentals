import { Component, OnInit } from '@angular/core';
import { EventService, IEvent, ISession } from '../events/index';
import { AuthService } from '../user/auth.service';

@Component({
  selector: 'nav-bar',
  templateUrl: './navbar.component.html',
  styles: [
    `
      .nav.navbar-nav {
        font-size: 15px;
      }
      #searchForm {
        margin-right: 100px;
      }
      @media (max-width: 1200px) {
        #searchForm {
          display: none;
        }
      }
      li > a.active {
        color: #f97924;
      }
    `
  ]
})
export class NavBarComponent implements OnInit {
  searchTerm = '';
  foundSessions: ISession[];
  events: IEvent[];

  constructor(public auth: AuthService, private eventService: EventService) {}

  ngOnInit() {
    this.getAllEvents();
  }

  getAllEvents() {
    this.eventService.getEvents().subscribe(data => {
      if (data) {
        this.events = data;
      }
    });
  }

  searchSessions(searchTerm) {
    this.eventService.searchSessions(searchTerm).subscribe(sessions => {
      this.foundSessions = sessions;
    });
  }
}
