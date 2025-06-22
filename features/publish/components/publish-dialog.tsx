import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { PublishForm } from "./publish-form";

export function PublishDialog({
  triggerLabel = "Publicar",
  triggerClassName = "",
}: {
  triggerLabel?: string;
  triggerClassName?: string;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={triggerClassName}>
          <Plus className="h-4 w-4 mr-2" />
          {triggerLabel}
        </Button>
      </DialogTrigger>
      <DialogContent className="!w-auto !max-w-none">
        <DialogTitle>Publicar producto</DialogTitle>
        <PublishForm />
      </DialogContent>
    </Dialog>
  );
}
