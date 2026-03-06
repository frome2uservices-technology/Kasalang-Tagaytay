import {
  trigger,
  transition,
  style,
  animate,
  query,
  group
} from '@angular/animations';

export const RouteFadeAnimation = trigger('routeFadeAnimation', [
  transition('* <=> *', [
    query(':enter, :leave', [
      style({
        position: 'absolute',
        width: '100%',
        opacity: 0
      })
    ], { optional: true }),

    group([
      query(':leave', [
        animate('50ms ease-out', style({ opacity: 0 }))
      ], { optional: true }),

      query(':enter', [
        style({ opacity: 0 }),
        animate('500ms ease-in', style({ opacity: 1 }))
      ], { optional: true })
    ])
  ])
]);