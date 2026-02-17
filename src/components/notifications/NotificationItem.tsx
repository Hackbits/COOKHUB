import { Notification } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Info, AlertTriangle, XCircle, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

interface NotificationItemProps {
  notification: Notification;
  onRead: (id: string) => void;
}

const getNotificationIcon = (type: Notification["type"]) => {
  switch (type) {
    case "success":
      return <CheckCircle2 className="h-4 w-4 text-emerald-500" />;
    case "warning":
      return <AlertTriangle className="h-4 w-4 text-amber-500" />;
    case "error":
      return <XCircle className="h-4 w-4 text-red-500" />;
    default:
      return <Info className="h-4 w-4 text-blue-500" />;
  }
};

export const NotificationItem = ({
  notification,
  onRead,
}: NotificationItemProps) => {
  const content = (
    <div
      className={cn(
        "flex flex-col gap-1 text-sm p-2 rounded-md transition-colors w-full cursor-pointer",
        notification.read ? "opacity-60" : "bg-orange-50/50",
      )}
      onClick={() => onRead(notification.id)}
    >
      <div className="flex items-start gap-2">
        <div className="mt-0.5">{getNotificationIcon(notification.type)}</div>
        <div className="flex-1 space-y-1">
          <p
            className={cn(
              "font-medium leading-none",
              !notification.read && "text-primary",
            )}
          >
            {notification.title}
          </p>
          <p className="text-xs text-muted-foreground line-clamp-2">
            {notification.message}
          </p>
          <p className="text-[10px] text-gray-400">
            {new Date(notification.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
        {!notification.read && (
          <span className="h-2 w-2 rounded-full bg-primary flex-shrink-0 mt-1" />
        )}
      </div>
    </div>
  );

  if (notification.link) {
    return (
      <DropdownMenuItem asChild className="p-0 focus:bg-transparent">
        <Link href={notification.link} className="w-full">
          {content}
        </Link>
      </DropdownMenuItem>
    );
  }

  return (
    <DropdownMenuItem
      className="p-0 focus:bg-transparent"
      onSelect={(e) => e.preventDefault()} // Prevent closing on click if desired, or let it close
    >
      {content}
    </DropdownMenuItem>
  );
};
