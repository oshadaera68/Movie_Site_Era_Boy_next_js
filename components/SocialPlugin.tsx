export default function SocialPlugin() {
  return (
    <div className="bg-black/60 p-4 rounded">
      <h3 className="font-bold mb-3">Social Plugin</h3>

      <div className="grid grid-cols-2 gap-2 text-sm">
        <button className="bg-blue-600 p-2">Facebook</button>
        <button className="bg-sky-500 p-2">Twitter</button>
        <button className="bg-pink-600 p-2">Instagram</button>
        <button className="bg-red-600 p-2">YouTube</button>
      </div>
    </div>
  );
}
