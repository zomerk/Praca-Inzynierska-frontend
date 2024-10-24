import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/daygrid';
import { TrainerControllerService } from '../../../services/services/trainer-controller.service';
import { Training } from '../../../services/models/training';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-trainer-trainings',
  templateUrl: './trainer-trainings-component.html',
  styleUrls: ['./trainer-trainings-component.css']
})
export class TrainerTrainingsComponent implements OnInit {
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,dayGridWeek,dayGridDay'
    },
    initialView: 'dayGridMonth',
    selectable: true, // Allows clicking on empty dates
    select: this.handleDateSelect.bind(this), // Handle date selection
    eventColor: '#F4C584', // Default color for events
    weekends: true,
    events: [],
    eventClick: this.handleEventClick.bind(this), // Event click handler
  };

  private userId: string | null = null; // User ID from URL

  constructor(
    private trainerService: TrainerControllerService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Get userId from URL
    this.userId = window.location.pathname.split('/')[3];
    if (this.userId) {
      this.loadTrainings(this.userId); // Fetch user's trainings
    }
  }

  loadTrainings(userId: string): void {
    this.trainerService.getUser1({userId:Number(userId)}).subscribe({
      next: (trainings) => {
        console.log(trainings);
        console.log("siema siema ");
        this.calendarOptions.events = this.formatTrainingsToEvents(trainings as Training[]);
      },
      error: (err) => {
        console.error('Error fetching trainings:', err);
      }
    });
  }

  formatTrainingsToEvents(trainings: Training[]): any[] {
    return trainings.map(training => ({
      title: training.workoutName,
      start: training.scheduledAt,
      extendedProps: {
        id: training.trainingId,
        segmentList: training.segmentList,
        activityType: training.activityType,
      },
      color: training.feedback ? '#90EE90' : '#F4C584', // Green if feedback exists, default otherwise
    }));
  }

  // Handle event click to view training details and feedback
  handleEventClick(event: any): void {
    const trainingId = event.event._def.extendedProps.id;
    this.router.navigate(['/trainer/training-details', this.userId, trainingId]); // Navigate to training details page
  }

  // Handle date selection for adding a new training
  handleDateSelect(selectInfo: any): void {
    const selectedDate = selectInfo.startStr; // The selected date in ISO format
    this.router.navigate(['/trainer/add-training', this.userId, { date: selectedDate }]); // Navigate to a page for creating a new training
  }
}
