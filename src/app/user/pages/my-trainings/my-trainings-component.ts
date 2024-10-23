import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/daygrid';
import { UserControllerService } from '../../../services/services/user-controller.service';
import { Training } from '../../../services/models/training';
import {Router} from '@angular/router';

@Component({
  selector: 'app-my-trainings',
  templateUrl: './my-trainings-component.html',
  styleUrls: ['./my-trainings-component.css']
})
export class MyTrainingsComponent implements OnInit {
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,dayGridWeek,dayGridDay'
    },
    initialView: 'dayGridMonth',
    eventColor: '#F4C584', // Color for events
    weekends: true, // Show weekends
    events: [], // Placeholder for training events
    eventClick: this.handleEventClick.bind(this), // Event click handler
  };

  private trainings: Training[] = [];

  constructor(private trainingService: UserControllerService, private router:Router) { }

  ngOnInit(): void {
    this.loadTrainings(); // Fetch trainings on component initialization
  }

  loadTrainings(): void {
    this.trainingService.getTraining().subscribe({
      next: (trainings) => {
        console.log(trainings);
        this.calendarOptions.events = this.formatTrainingsToEvents(trainings as Training[]);
      },
      error: (err) => {
        console.error('Error fetching trainings:', err);
      }
    });
  }

  formatTrainingsToEvents(trainings: Training[]): any[] {
    this.trainings = trainings;
    return trainings.map(training => ({
      title: training.workoutName,
      start: training.scheduledAt, // Make sure this is in ISO format, or convert if needed
      extendedProps: {
        id: training.trainingId,
        segmentList: training.segmentList, // Store segments for access on click
        activityType: training.activityType,
      },
      color: training.feedback ? '#90EE90' : '#F4C584', // Green if feedback exists, otherwise default color
    }));
  }

  // Handle event click and open dialog to show details
  handleEventClick(event: any): void {
    const trainingId = event.event._def.extendedProps.id;

    //console.log(event.event._def.extendedProps.id);
    this.router.navigate(['/user/training-details',  trainingId]); // N
  }
}
