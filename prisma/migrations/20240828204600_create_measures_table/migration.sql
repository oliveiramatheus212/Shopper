-- CreateTable
CREATE TABLE "measures" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "measure_date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "measure_type" TEXT NOT NULL,
    "is_confirmed" BOOLEAN NOT NULL DEFAULT false,
    "image_url" TEXT NOT NULL,
    "customer_id" TEXT NOT NULL,
    CONSTRAINT "measures_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
