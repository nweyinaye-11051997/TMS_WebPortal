export function getTodayDate(): string {
  const today = new Date();
  return today.toISOString().split('T')[0]; // Extract YYYY-MM-DD
}
export function calculateDuration(startDate: Date, endDate: Date) {
  // Calculate the difference in milliseconds
  const diffInMillis = endDate.getTime() - startDate.getTime();

  // Convert the difference to days, hours, and minutes
  const days = Math.floor(diffInMillis / (1000 * 60 * 60 * 24)); // 1 day = 1000 * 60 * 60 * 24 milliseconds
  const hours = Math.floor(
    (diffInMillis % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  ); // Remaining hours
  const minutes = Math.floor((diffInMillis % (1000 * 60 * 60)) / (1000 * 60)); // Remaining minutes

  return days;
}
export const projectList = [
  { name: 'TMS', value: '1' },
  { name: 'HR', value: '2' },
  { name: 'Smart QR', value: '3' },
];
export const statusList = [
  { name: 'Not Start', value: 'Not Start' },
  { name: 'Progress', value: 'Progress' },
  { name: 'Complete', value: 'Complete' },
];
export const priority = [
  { name: 'High', value: 4 },
  { name: 'Urgent', value: 3 },
  { name: 'Normal', value: 2 },
  { name: 'Low', value: 1 },
];
export const progress = [
  { name: '0 %', value: 0 },
  { name: '40 %', value: 40 },
  { name: '50 %', value: 50 },
  { name: '90 %', value: 90 },
];
export const memberlist = [
  { name: 'Nwe Yin Aye', value: 'Nwe Yin Aye' },
  { name: 'Aye Myat Thu', value: 'Aye Myat Thu' },
  { name: 'Su Darli Aung', value: 'Su Darli Aung' },
  { name: 'Heing Min Lwin', value: 'Heing Min Lwin' },
];
