// app/assets/page.tsx
import { redirect } from 'next/navigation';

export default function AssetsRootPage() {
  // Direkt weiterleiten zur "Alle Assets"-Seite
  redirect('/assets/all');
  // Oder alternativ hier eine Landing Page für Assets mit Einführungstext
  // return (
  //   <div>
  //     <h1>Willkommen zur Asset-Verwaltung</h1>
  //     <p>Wähle einen Bereich aus der Sidebar oder gehe zu <a href="/assets/all">Alle Assets</a>.</p>
  //   </div>
  // );
}