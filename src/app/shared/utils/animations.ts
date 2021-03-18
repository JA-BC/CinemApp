import { trigger, transition, style, animate } from '@angular/animations';

export const SLIDEUP_ANIMATION = trigger(
    'slideUp', [
        transition(':enter', [
            style({ transform: 'translateY(100%)', opacity: 0 }),
            animate('250ms', style({ transform: 'translateY(0)', opacity: 1 }))
        ]),
        transition(':leave', [
            style({ transform: 'translateY(0)', opacity: 1 }),
            animate('250ms', style({ transform: 'translateY(100%)', opacity: 0 }))
        ]),
    ]
);

export const SLIDEDOWN_ANIMATION = trigger(
    'slideDown', [
        transition(':enter', [
            style({ transform: 'translateY(-100%)', opacity: 0 }),
            animate('250ms', style({ transform: 'translateY(0)', opacity: 1 }))
        ]),
        transition(':leave', [
            style({ transform: 'translateY(0)', opacity: 1 }),
            animate('250ms', style({ transform: 'translateY(-100%)', opacity: 0 }))
        ]),
    ]
);

export const FADE_ANIMATION = trigger(
    'fadeAnimation', [
        transition(':enter', [
            style({ opacity: 0 }),
            animate('250ms', style({ opacity: 1 }))
        ]),
        transition(':leave', [
            style({ opacity: 1 }),
            animate('250ms', style({ opacity: 0 }))
        ]),
    ]
);
