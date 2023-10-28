const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  await prisma.starSign.createMany({
    data: [
      { title: "Aries", signId: "aries" },
      { title: "Taurus", signId: "taurus" },
      { title: "Gemini", signId: "gemini" },
      { title: "Cancer", signId: "cancer" },
      { title: "Leo", signId: "leo" },
      { title: "Virgo", signId: "virgo" },
      { title: "Libra", signId: "libra" },
      { title: "Scorpio", signId: "scorpio" },
      { title: "Sagittarius", signId: "sagittarius" },
      { title: "Capricorn", signId: "capricorn" },
      { title: "Aquarius", signId: "aquarius" },
      { title: "Pisces", signId: "pisces" },
    ],
  });
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
