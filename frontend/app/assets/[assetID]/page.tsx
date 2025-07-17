// app/assets/[assetId]/page.tsx
interface AssetDetailPageProps {
  params: {
    assetId: string; // Der dynamische Teil der URL
  };
}

export default function AssetDetailPage({ params }: AssetDetailPageProps) {
  const { assetId } = params;
  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6">Asset Details: {assetId}</h1>
      <p className="text-lg text-muted-foreground">Hier werden die detaillierten Informationen für Asset ID: {assetId} angezeigt.</p>
      {/* Hier kommen später die Asset-Details */}
    </div>
  );
}