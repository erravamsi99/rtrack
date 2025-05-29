 export interface ProgressWidget {
   widget_id: string;
   title: string;
   contentName: string;
   num_completed: number;
   num_total: number;
   percentage: number; // e.g., 65
};