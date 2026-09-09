-- CreateTable
CREATE TABLE "ref_tokens" (
    "id" TEXT NOT NULL,
    "token_id" TEXT NOT NULL,
    "token_hash" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "is_revoked" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ref_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ref_tokens_token_id_key" ON "ref_tokens"("token_id");

-- CreateIndex
CREATE INDEX "ref_tokens_user_id_idx" ON "ref_tokens"("user_id");

-- AddForeignKey
ALTER TABLE "ref_tokens" ADD CONSTRAINT "ref_tokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
