-- CreateTable
CREATE TABLE "address" (
    "id" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "street1" VARCHAR(255) NOT NULL,
    "street2" VARCHAR(255),
    "city" VARCHAR(255) NOT NULL,
    "state" VARCHAR(255) NOT NULL,
    "zipcode" VARCHAR(255) NOT NULL,
    "country" VARCHAR(255) NOT NULL,
    "type" VARCHAR(255) NOT NULL,
    "createdByUserId" VARCHAR(255) NOT NULL,

    CONSTRAINT "address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" VARCHAR(255) NOT NULL,
    "firstName" VARCHAR(255) NOT NULL,
    "lastName" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "addressId" VARCHAR(255),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);
