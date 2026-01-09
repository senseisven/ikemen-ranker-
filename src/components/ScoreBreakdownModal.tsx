import { PersonScores } from '@/data/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface ScoreBreakdownModalProps {
  isOpen: boolean;
  onClose: () => void;
  personName: string;
  scores: PersonScores;
  total: number;
}

const scoreLabels: Record<keyof PersonScores, string> = {
  cleanliness: '清潔感',
  facial: '顔立ち',
  vibe: '雰囲気',
  fashion: 'ファッション',
  charisma: 'カリスマ',
};

const ScoreBreakdownModal = ({
  isOpen,
  onClose,
  personName,
  scores,
  total,
}: ScoreBreakdownModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-heading">
            {personName} のスコア詳細
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 mt-4">
          {(Object.keys(scores) as Array<keyof PersonScores>).map((key) => (
            <div key={key} className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {scoreLabels[key]}
              </span>
              <div className="flex items-center gap-3">
                <div className="w-24 h-1.5 bg-secondary overflow-hidden">
                  <div
                    className="h-full bg-foreground transition-all"
                    style={{ width: `${(scores[key] / 20) * 100}%` }}
                  />
                </div>
                <span className="font-mono text-sm tabular-nums w-6 text-right">
                  {scores[key]}
                </span>
              </div>
            </div>
          ))}
          
          <div className="pt-4 border-t border-border flex items-center justify-between">
            <span className="font-medium text-foreground">合計</span>
            <span className="font-mono text-lg tabular-nums font-bold">
              {total}
            </span>
          </div>
          
          <p className="text-xs text-muted-foreground">
            各項目は20点満点、合計100点満点で評価しています。
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ScoreBreakdownModal;
