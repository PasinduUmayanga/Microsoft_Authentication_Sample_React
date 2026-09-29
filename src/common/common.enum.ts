// Identifies which MSAL interaction flow a login/logout action used.
// Kept for labeling purposes (e.g. the button clicked) rather than as a
// single app-wide mode, since the UI now offers both flows side by side.
export enum EnumLoginWindowType {
  Popup = 1,
  InWindow = 2,
}
