"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { liveFaqs } from "@/data/interioData";
import { useCart } from "@/context/CartContext";

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { showToast } = useCart();

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faqs" className="py-16 sm:py-24 bg-white border-t border-gray-100">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-20 space-y-16">
        {/* FAQ Section: How can we assist you? */}
        <div className="w-full">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1c1c1c] tracking-tight">
              How can we assist you?
            </h2>
            <button
              onClick={() => showToast("Opening Frequently Asked Questions catalog...")}
              className="text-sm font-semibold text-gray-900 border-b-2 border-gray-900 pb-0.5 hover:text-[#c0262d] hover:border-[#c0262d] transition-colors cursor-pointer"
            >
              View all
            </button>
          </div>

          <div className="w-full divide-y divide-gray-200 border-y border-gray-200">
            {liveFaqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <div key={index} className="py-5">
                  <button
                    onClick={() => toggle(index)}
                    className="w-full flex items-center justify-between text-left group cursor-pointer"
                  >
                    <span className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-[#c0262d] transition-colors pr-4">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-600 shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-[#c0262d]" : ""
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="mt-4 text-sm text-gray-600 leading-relaxed font-normal animate-in fade-in duration-200">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* SEO Rich Content Section: Explore Interio by Godrej Furniture Online */}
        <div className="w-full pt-10 border-t border-gray-200 text-gray-700 space-y-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1c1c1c] tracking-tight mb-6">
              Explore Interio by Godrej Furniture Online
            </h2>
            <div className="space-y-6 text-xs sm:text-sm leading-relaxed text-gray-600 font-normal">
              <div>
                <h3 className="font-bold text-gray-900 mb-1.5 text-sm sm:text-base">
                  Buy Furniture Online – Transform Your Home with Interio by Godrej
                </h3>
                <p>
                  Welcome to Interio by Godrej, your ultimate destination to buy furniture online. With a legacy of excellence and innovation, we bring you an extensive range of furniture that combines functionality, style, and durability. Explore our vast collection and transform your home into a haven of comfort and elegance. Our mission is to provide you with the best furniture online, making your shopping experience seamless and enjoyable.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-1.5 text-sm sm:text-base">
                  Why buy Furniture Online?
                </h3>
                <p>
                  Wide Selection: Our extensive catalog offers a variety of furniture options to suit different tastes and budgets. Whether you&apos;re looking for an affordable furniture online or a premium furniture, we have something for everyone.
                </p>
                <p className="mt-2">
                  Easy Navigation: Our website is designed for a seamless online shopping experience, allowing you to find and buy furniture online quickly and easily. With detailed product descriptions, high-resolution images, and customer reviews, you can make informed decisions from the comfort of your home.
                </p>
                <p className="mt-2">
                  Secure Transactions: We prioritize your security, offering safe and secure payment options for a hassle-free online furniture shopping experience. Our website uses the latest encryption technology to protect your personal and financial information.
                </p>
                <p className="mt-2">
                  Customer Support: Our dedicated customer support team is always ready to assist you with any queries or concerns, ensuring a smooth shopping journey online. We are committed to providing you with the best shopping experience possible.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-1.5 text-sm sm:text-base">
                  Interio by Godrej – Your Trusted Destination for Online Furniture Shopping
                </h3>
                <p>
                  At Godrej, we understand the importance of online furniture shopping from the comforts of your home. Our commitment to quality and customer satisfaction sets us apart. Here&apos;s why you should buy furniture online from Interio by Godrej:
                </p>
                <p className="mt-2">
                  Unmatched Quality: Our furniture is crafted from premium materials, ensuring long-lasting durability and timeless appeal. Each piece undergoes rigorous quality checks to meet the highest standards.
                </p>
                <p className="mt-2">
                  Innovative Designs: We offer a wide range of innovative designs that cater to various tastes and preferences, making it easy to find furniture that complements your style. From contemporary to classic, our designs are both functional and aesthetically pleasing.
                </p>
                <p className="mt-2">
                  Convenient Shopping Experience: Our user-friendly website allows you to browse and purchase furniture online with ease, from the comfort of your home. With detailed product descriptions, high-resolution images, and customer reviews, making an informed decision while shopping furniture online.
                </p>
                <p className="mt-2">
                  Trusted Brand: With decades of expertise, Godrej is a name you can trust for online furniture shopping. Our reputation for excellence is built on a foundation of quality, innovation, and customer satisfaction.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-1.5 text-sm sm:text-base">
                  How to Buy the Right Furniture Online
                </h3>
                <p>
                  Buying furniture online can be a delightful experience with these simple tips:
                </p>
                <p className="mt-2">
                  Measure Your Space: Ensure the furniture fits perfectly by measuring your space accurately before making a purchase. Consider the dimensions of the room, doorways, and any other obstacles that may affect the delivery and placement of the furniture.
                </p>
                <p className="mt-2">
                  Consider Your Style: While shopping furniture online, choose furniture that aligns with your personal style and complements your existing décor. Whether you prefer contemporary, traditional, or eclectic styles, we have a wide range of options to suit your taste.
                </p>
                <p className="mt-2">
                  Check Product Details: When you are considering to buy furniture online, read product descriptions carefully to understand the materials, dimensions, and features of each item. This will help you make an informed decision and ensure that the furniture meets your expectations. Invest in durable wooden furniture online available at Interio by Godrej website.
                </p>
                <p className="mt-2">
                  Read Reviews: Benefit from the experiences of other customers by reading reviews and ratings. This will give you a better understanding of the quality and performance when you buy furniture online.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-1.5 text-sm sm:text-base">
                  Sustainable and Eco-Friendly Options
                </h3>
                <p>
                  At Interio by Godrej, we are committed to sustainability and eco-friendly practices. Our range includes furniture made from responsibly sourced materials and designed to minimize environmental impact. Choose our eco-friendly furniture online and contribute to a greener planet while enjoying top-notch quality and design.
                </p>
                <p className="mt-2">
                  Choose Durable Pieces: Invest in high-quality, durable furniture that will last longer and reduce the need for frequent replacements. Our furniture is designed to withstand the test of time, ensuring that you get the best value for your money.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-1.5 text-sm sm:text-base">
                  Creating a Cohesive Look
                </h3>
                <p>
                  Consistent Style: Stick to a consistent style or theme throughout your home for a harmonious and balanced appearance. Whether you prefer contemporary, traditional, or eclectic styles, choose furniture that complements your overall design scheme.
                </p>
                <p className="mt-2">
                  Mix and Match: Don&apos;t be afraid to mix and match different pieces and styles to add personality and interest to your space. Combine different textures, materials, and patterns to create a unique and personalized look.
                </p>
                <p className="mt-2">
                  Balance: Ensure that the furniture pieces in each room are balanced in terms of size, scale, and proportion. This will create a harmonious and visually appealing space.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-1.5 text-sm sm:text-base">
                  Our Commitment to Customer Satisfaction
                </h3>
                <p>
                  At Interio, customer satisfaction is our top priority. We are dedicated to providing you with the best online furniture shopping experience possible. Here&apos;s how we ensure your satisfaction:
                </p>
                <p className="mt-2">
                  Quality Assurance: Our furniture undergoes rigorous quality checks to ensure it meets the highest standards. We are committed to providing you with durable and stylish furniture that stands the test of time.
                </p>
                <p className="mt-2">
                  Hassle-Free Returns: If you are not completely satisfied with your purchase, our hassle-free return policy allows you to cancel and replace your order within a stipulated timeframe.
                </p>
              </div>

              {/* SEO Categories Links Section matching live_vp_v_17.png */}
              <div className="pt-6 border-t border-gray-200 space-y-4">
                <div>
                  <h4 className="font-bold text-gray-900 mb-1 text-sm">
                    Explore Living Room Furniture by Interio by Godrej
                  </h4>
                  <p className="text-gray-500 text-xs">
                    Bean Bags &amp; Pouffes | Coffee Tables | Corner Tables | Leisure Chairs | Display Units | TV Units | Ottomans | Sofas &amp; loungers | Sofas | Recliner Sofa | Sofa Cum Beds | Sofa Sets | L Shaped &amp; Corner Sofa | 1 Seater Sofa | 2 Seater Sofa | 3 Seater Sofa | Fabric Sofa | Leather And Leatherette Sofa | Shoe Racks | Accessories | Soft Furnishings
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 mb-1 text-sm">
                    Explore Bedroom Furniture by Interio by Godrej
                  </h4>
                  <p className="text-gray-500 text-xs">
                    Almirah &amp; Wardrobe | Beds | Mattresses | Home Lockers | Steel Almirah | Wooden Wardrobes | King Size Bed | Queen Size Bed | Single Bed | King Size Mattress | Queen Size Mattress | Single Bed Mattress | Double Bed Mattress | Bedside Tables | Dressing Tables | Chest of Drawers | Digital Lockers | Biometric Lockers | Manual Lockers | Two Door Wardrobe | Three Door Wardrobe | Four Door Wardrobe | Sliding Wardrobe | Wooden Beds | Metal beds | Double Beds | Foam Mattress | Spring Mattress | Ortho Mattress | Bed and Mattress Sets | Cabinets
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 mb-1 text-sm">
                    Explore Study &amp; Office Furniture by Interio by Godrej
                  </h4>
                  <p className="text-gray-500 text-xs">
                    Work Desk &amp; Study Tables | Office Chairs | Gaming Chairs | File Cabinets | Chair Sets | Chairs | Tables | Study Tables
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 mb-1 text-sm">
                    Explore Dining Room Furniture by Interio by Godrej
                  </h4>
                  <p className="text-gray-500 text-xs">
                    Dining Furniture | Dining Sets | Dining Tables | Dining Chairs | Dining Benches | Dining Accessories
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
