import {
  loadingStyles,
  skeletonBaseClassName,
} from "@/styles/book-detail-styles";

export default function BookLoading() {
  return (
    <div className={loadingStyles.container}>
      <div
        className={`${skeletonBaseClassName} ${loadingStyles.backButtonSkeleton}`}
      ></div>

      <div className={loadingStyles.loadingCard}>
        <div className={loadingStyles.header}>
          <div
            className={`${skeletonBaseClassName} ${loadingStyles.coverSkeleton}`}
          ></div>

          <div>
            <div
              className={`${skeletonBaseClassName} ${loadingStyles.titleSkeleton}`}
            ></div>
            <div
              className={`${skeletonBaseClassName} ${loadingStyles.authorSkeleton}`}
            ></div>

            <div className={loadingStyles.metaGrid}>
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className={`${skeletonBaseClassName} ${loadingStyles.metaSkeleton}`}
                ></div>
              ))}
            </div>
          </div>
        </div>

        <div
          className={`${skeletonBaseClassName} ${loadingStyles.descriptionSkeleton}`}
        ></div>
      </div>
    </div>
  );
}
