export const CharacterPlate = ({ character }: { character: string }) => (
  <div className="module gold fontBold padding16">
    {character ? character : "No player found..."}
  </div>
);
