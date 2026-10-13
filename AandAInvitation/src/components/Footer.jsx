export default function Footer({ content }) {
  return (
    <footer className="text-center py-10 text-[#8C7A6B] text-sm tracking-widest">
      <p>{content.footer.text}</p>
    </footer>
  );
}