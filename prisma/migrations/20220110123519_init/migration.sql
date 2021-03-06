-- CreateTable
CREATE TABLE "Cache" (
    "id" SERIAL NOT NULL,
    "route" TEXT NOT NULL,
    "response" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cache_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cache_route_key" ON "Cache"("route");
