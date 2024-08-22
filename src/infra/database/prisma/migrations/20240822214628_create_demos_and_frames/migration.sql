-- CreateTable
CREATE TABLE "demos" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "demos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "frames" (
    "id" TEXT NOT NULL,
    "demo_id" TEXT NOT NULL,
    "html" TEXT NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "frames_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "demos_slug_key" ON "demos"("slug");

-- AddForeignKey
ALTER TABLE "frames" ADD CONSTRAINT "frames_demo_id_fkey" FOREIGN KEY ("demo_id") REFERENCES "demos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
