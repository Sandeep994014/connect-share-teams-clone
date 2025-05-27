
import { Button } from "@/components/ui/button";

interface EmojiPickerProps {
  onEmojiSelect: (emoji: string) => void;
}

const emojis = [
  "😀", "😂", "😍", "🤔", "😢", "😡", "👍", "👎",
  "❤️", "🎉", "🔥", "💯", "✨", "⭐", "👏", "🙌",
  "🎯", "💡", "⚡", "🚀", "💪", "🎊", "🎈", "🎁"
];

export function EmojiPicker({ onEmojiSelect }: EmojiPickerProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3 w-64">
      <div className="grid grid-cols-8 gap-1">
        {emojis.map((emoji, index) => (
          <Button
            key={index}
            variant="ghost"
            size="sm"
            onClick={() => onEmojiSelect(emoji)}
            className="p-2 h-8 w-8 hover:bg-gray-100 text-lg"
          >
            {emoji}
          </Button>
        ))}
      </div>
    </div>
  );
}
