// The desktop wallpaper: a slow-moving grid with faint scanlines over it.
// It is decoration only, and all of its movement is in the CSS file.
export default function Wallpaper() {
  return (
    <div className="wallpaper" aria-hidden="true">
      <div className="wallpaper-grid" />
      <div className="wallpaper-scanlines" />
    </div>
  );
}
